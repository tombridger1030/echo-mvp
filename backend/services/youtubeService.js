const axios = require('axios');

async function searchYoutube(query) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${API_KEY}&type=video&maxResults=5`;

  try {
    const response = await axios.get(url);
    return response.data.items.map(item => ({
      title: item.snippet.title,
      description: item.snippet.description,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails.medium.url
    }));
  } catch (error) {
    console.error('Error searching YouTube:', error);
    throw error;
  }
}

module.exports = { searchYoutube };