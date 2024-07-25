const { analyzeTranscript } = require('./trasncriptAnalyzer');

function rankVideos(videos, query) {
  return videos.map(video => {
    let score = 0;

    // Content Quality (40% weight)
    if (video.transcript) {
      const transcriptAnalysis = analyzeTranscript(video.transcript, query);
      
      // Keyword relevance (20%)
      score += transcriptAnalysis.keywordRelevance * 0.20;
      
      // Readability (10%)
      score += transcriptAnalysis.readabilityScore * 0.10;
      
      // Structure (10%)
      score += transcriptAnalysis.structureScore * 0.10;
    }

    // User Engagement (30% weight)
    const likeRatio = video.likeCount / (video.viewCount || 1);
    score += Math.min(likeRatio, 0.1) * 3; // Cap at 10% like ratio for full score

    // Creator Credibility (15% weight)
    score += Math.min(Math.log10(video.channelSubscriberCount || 1) / 7, 1) * 0.15;

    // Freshness and Relevance (15% weight)
    const ageInDays = (new Date() - new Date(video.publishedAt)) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 1 - ageInDays / 365) * 0.10; // Full score for videos less than a year old

    if (video.title.toLowerCase().includes(query.toLowerCase())) {
      score += 0.05;
    }

    return { ...video, score };
  }).sort((a, b) => b.score - a.score);
}

module.exports = { rankVideos };