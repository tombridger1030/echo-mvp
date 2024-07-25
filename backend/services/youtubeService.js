const axios = require('axios');
const { getSubtitles } = require('youtube-captions-scraper');

const API_KEY = process.env.YOUTUBE_API_KEY;

async function searchYoutube(query) {
  console.log('Searching YouTube for:', query);
  console.log('Using API Key:', API_KEY ? 'Key is set' : 'Key is not set');

  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${API_KEY}&type=video&maxResults=10`;

  try {
    console.log('Fetching search results...');
    const searchResponse = await axios.get(searchUrl);
    console.log('Search response received:', searchResponse.status);
    
    if (searchResponse.data.items.length === 0) {
      console.log('No search results found');
      return [];
    }

    const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');

    console.log('Fetching video details...');
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${API_KEY}`;
    const videoResponse = await axios.get(videoUrl);
    console.log('Video details received:', videoResponse.status);

    const videos = await Promise.all(videoResponse.data.items.map(async item => {
      console.log('Processing video:', item.id);
      
      console.log('Fetching channel details...');
      const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${item.snippet.channelId}&key=${API_KEY}`;
      const channelResponse = await axios.get(channelUrl);
      console.log('Channel details received:', channelResponse.status);

      let transcript = '';
      try {
        console.log('Fetching transcript...');
        const subtitles = await getSubtitles({
          videoID: item.id,
          lang: 'en' // or 'auto' for automatic language detection
        });
        transcript = subtitles.map(item => item.text).join(' ');
        console.log('Transcript fetched successfully');
      } catch (error) {
        console.error(`Failed to get transcript for video ${item.id}:`, error);
      }

      return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.medium.url,
        viewCount: parseInt(item.statistics.viewCount || '0'),
        likeCount: parseInt(item.statistics.likeCount || '0'),
        commentCount: parseInt(item.statistics.commentCount || '0'),
        channelTitle: item.snippet.channelTitle,
        channelSubscriberCount: parseInt(channelResponse.data.items[0].statistics.subscriberCount || '0'),
        transcript: transcript
      };
    }));

    console.log(`Processed ${videos.length} videos`);
    return videos;
  } catch (error) {
    console.error('Error searching YouTube:', error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = { searchYoutube };