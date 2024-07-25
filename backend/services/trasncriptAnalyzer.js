const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

function analyzeTranscript(transcript, query) {
  if (!transcript) {
    return {
      keywordRelevance: 0,
      readabilityScore: 0,
      structureScore: 0,
    };
  }

  const keywordRelevance = calculateKeywordRelevance(transcript, query);
  const readabilityScore = calculateReadabilityScore(transcript);
  const structureScore = analyzeStructure(transcript);

  return {
    keywordRelevance,
    readabilityScore,
    structureScore,
  };
}

function calculateKeywordRelevance(transcript, query) {
  const transcriptWords = transcript.toLowerCase().split(/\s+/);
  const queryWords = query.toLowerCase().split(/\s+/);
  
  let exactMatchScore = 0;
  let partialMatchScore = 0;

  queryWords.forEach(queryWord => {
    const exactMatches = transcriptWords.filter(word => word === queryWord).length;
    exactMatchScore += exactMatches / transcriptWords.length;

    const partialMatches = transcriptWords.filter(word => word.includes(queryWord)).length;
    partialMatchScore += partialMatches / transcriptWords.length;
  });

  // Normalize scores
  exactMatchScore /= queryWords.length;
  partialMatchScore /= queryWords.length;

  // Combine scores, giving more weight to exact matches
  const combinedScore = (exactMatchScore * 0.8) + (partialMatchScore * 0.2);

  // Apply an even more aggressive scaling factor
  return Math.min(1, Math.pow(combinedScore * 12, 0.65));
}

function calculateReadabilityScore(transcript) {
  const sentences = transcript.split(/[.!?]+/);
  const words = tokenizer.tokenize(transcript);
  
  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = words.reduce((sum, word) => sum + syllableCount(word), 0) / words.length;

  // Flesch-Kincaid Grade Level
  const readabilityScore = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;

  // Normalize to a 0-1 scale, assuming a range of 0-20 for the grade level
  return Math.max(0, Math.min(1, 1 - readabilityScore / 20));
}

function syllableCount(word) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  return word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
             .replace(/^y/, '')
             .match(/[aeiouy]{1,2}/g)?.length || 1;
}

function analyzeStructure(transcript) {
  const sentences = transcript.split(/[.!?]+/);
  const paragraphs = transcript.split(/\n\s*\n/);

  // Check for introduction and conclusion
  const hasIntro = sentences[0].toLowerCase().includes('introduction') || 
                   sentences[0].toLowerCase().includes('in this video');
  const hasConclusion = sentences[sentences.length - 1].toLowerCase().includes('conclusion') || 
                        sentences[sentences.length - 1].toLowerCase().includes('in summary');

  // Check for clear paragraph structure
  const hasClearStructure = paragraphs.length > 1 && paragraphs.every(p => p.trim().length > 0);

  // Simple scoring based on these factors
  let structureScore = 0;
  if (hasIntro) structureScore += 0.33;
  if (hasConclusion) structureScore += 0.33;
  if (hasClearStructure) structureScore += 0.34;

  return structureScore;
}

module.exports = { analyzeTranscript };