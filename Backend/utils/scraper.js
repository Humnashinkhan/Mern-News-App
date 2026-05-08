const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const scrapeHackerNews = async () => {
  try {
    console.log('Starting HackerNews scraper...');
    const { data } = await axios.get('https://news.ycombinator.com/');
    const $ = cheerio.load(data);
    const stories = [];

    $('.athing').slice(0, 10).each((index, element) => {
      const titleLine = $(element).find('.titleline > a');
      const title = titleLine.text();
      const url = titleLine.attr('href');
      
      const subtextRow = $(element).next();
      const pointsText = subtextRow.find('.score').text();
      const points = parseInt(pointsText.replace(/[^0-9]/g, '')) || 0;
      const author = subtextRow.find('.hnuser').text();
      const postedAt = subtextRow.find('.age').attr('title') || subtextRow.find('.age').text();

      stories.push({
        title,
        url,
        points,
        author,
        postedAt
      });
    });

    console.log(`Scraped ${stories.length} stories. Saving to database...`);
    
    for (const storyData of stories) {
      await Story.findOneAndUpdate(
        { title: storyData.title }, 
        storyData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log('Scraping completed successfully.');
  } catch (error) {
    console.error('Error during scraping:', error.message);
  }
};

module.exports = scrapeHackerNews;
