export function extractTopic(query) {
  // List of phrases to remove
  const phrasesToRemove = [
    "i want to learn about",
    "tell me about",
    "what is",
    "how does",
    "explain",
    "i need to know about",
  ];

  let cleanedQuery = query.toLowerCase();

  // Remove phrases
  for (const phrase of phrasesToRemove) {
    cleanedQuery = cleanedQuery.replace(phrase, "");
  }

  // Trim whitespace and capitalize the first letter
  cleanedQuery = cleanedQuery.trim();
  return cleanedQuery.charAt(0).toUpperCase() + cleanedQuery.slice(1);
}