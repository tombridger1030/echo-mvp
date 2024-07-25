const express = require('express');
const router = express.Router();
const { searchYoutube } = require('../services/youtubeService');
const { rankVideos } = require('../services/videoRanker');

// In-memory storage for search history (replace with database in production)
let searchHistory = [];

router.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const videos = await searchYoutube(query);
    const rankedVideos = rankVideos(videos, query);

    // Generate synopsis from top 3 video descriptions
    const synopsis = generateSynopsis(rankedVideos.slice(0, 3));

    // Add to search history
    addToSearchHistory(query, synopsis);

    res.json({ videos: rankedVideos.slice(0, 8), synopsis });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: error.message || 'An error occurred during the search' });
  }
});

router.get('/history', (req, res) => {
  res.json(searchHistory.slice(0, 3)); // Return last 3 unique searches
});

function generateSynopsis(videos) {
  const combinedDescriptions = videos.map(v => v.description).join(' ');
  const words = combinedDescriptions.split(/\s+/).slice(0, 50); // Get first 50 words
  return words.join(' ') + (words.length === 50 ? '...' : '');
}

function addToSearchHistory(query, synopsis) {
  // Remove existing entry with the same query
  searchHistory = searchHistory.filter(item => item.query !== query);
  
  // Add new entry at the beginning
  searchHistory.unshift({ query, synopsis });
  
  // Keep only last 10 unique searches
  if (searchHistory.length > 10) searchHistory.pop();
}

module.exports = router;