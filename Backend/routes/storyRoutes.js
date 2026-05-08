const express = require('express');
const router = express.Router();
const { getStories, getStory, toggleBookmark, getBookmarks, triggerScrape } = require('../controllers/storyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getStories);
router.post('/scrape', triggerScrape);
router.get('/bookmarks', protect, getBookmarks); 
router.get('/:id', getStory);
router.post('/:id/bookmark', protect, toggleBookmark);

module.exports = router;
