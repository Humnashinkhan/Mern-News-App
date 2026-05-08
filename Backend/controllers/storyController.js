const Story = require('../models/Story');
const User = require('../models/User');
const scrapeHackerNews = require('../utils/scraper');

const getStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Story.countDocuments();
    const stories = await Story.find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      stories,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Story not found' });
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const triggerScrape = async (req, res) => {
  try {
    await scrapeHackerNews();
    res.json({ message: 'Scraping triggered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Scraping failed' });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const storyId = req.params.id;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isBookmarked = user.bookmarks.includes(storyId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter(id => id.toString() !== storyId);
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();
    
    const updatedUser = await User.findById(userId).populate('bookmarks');
    res.json({ message: isBookmarked ? 'Bookmark removed' : 'Bookmark added', bookmarks: updatedUser.bookmarks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('bookmarks');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStories, getStory, toggleBookmark, getBookmarks, triggerScrape };
