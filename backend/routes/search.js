const express = require('express');
const router = express.Router();
const { searchYoutube } = require('../services/youtubeService');

router.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    const videos = await searchYoutube(query);
    res.json({ videos });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'An error occurred during the search' });
  }
});

module.exports = router;