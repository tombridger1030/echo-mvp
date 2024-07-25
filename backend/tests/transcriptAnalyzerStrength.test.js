const { analyzeTranscript } = require('../services/trasncriptAnalyzer');

describe('Transcript Analyzer Strength Test', () => {
  const testCases = [
    {
      name: 'High Relevance, Easy Readability, Good Structure',
      transcript: `
        Introduction: In this video, we'll learn about JavaScript programming.
        
        JavaScript is a popular programming language used for web development.
        It allows developers to create interactive websites and web applications.
        
        First, we'll cover basic syntax and data types.
        Then, we'll look at functions and objects.
        Finally, we'll explore some advanced concepts like closures and promises.
        
        Conclusion: JavaScript is a powerful and versatile language for web development.
      `,
      query: 'JavaScript programming',
      expectedScores: {
        keywordRelevance: { min: 0.4, max: 1 },
        readabilityScore: { min: 0.7, max: 1 },
        structureScore: { min: 0.7, max: 1 },
      }
    },
    {
      name: 'Medium Relevance, Medium Readability, Medium Structure',
      transcript: `
        Web development involves various technologies.
        JavaScript is one of them, along with HTML and CSS.
        These languages work together to create web pages.
        Developers use these tools to build interactive sites.
      `,
      query: 'JavaScript programming',
      expectedScores: {
        keywordRelevance: { min: 0.25, max: 0.7 },
        readabilityScore: { min: 0.4, max: 0.8 },
        structureScore: { min: 0.3, max: 0.7 },
      }
    },
    {
      name: 'Low Relevance, Hard Readability, Poor Structure',
      transcript: `
        Quantum chromodynamics, a fundamental theory in particle physics, 
        describes the strong interaction between quarks and gluons. 
        The mathematical formulation involves complex gauge theories and 
        non-abelian symmetries, leading to phenomena like color confinement 
        and asymptotic freedom.
      `,
      query: 'JavaScript programming',
      expectedScores: {
        keywordRelevance: { min: 0, max: 0.1 },
        readabilityScore: { min: 0, max: 0.3 },
        structureScore: { min: 0, max: 0.3 },
      }
    },
  ];

  testCases.forEach(testCase => {
    test(testCase.name, () => {
      const result = analyzeTranscript(testCase.transcript, testCase.query);
      
      expect(result.keywordRelevance).toBeGreaterThanOrEqual(testCase.expectedScores.keywordRelevance.min);
      expect(result.keywordRelevance).toBeLessThanOrEqual(testCase.expectedScores.keywordRelevance.max);
      
      expect(result.readabilityScore).toBeGreaterThanOrEqual(testCase.expectedScores.readabilityScore.min);
      expect(result.readabilityScore).toBeLessThanOrEqual(testCase.expectedScores.readabilityScore.max);
      
      expect(result.structureScore).toBeGreaterThanOrEqual(testCase.expectedScores.structureScore.min);
      expect(result.structureScore).toBeLessThanOrEqual(testCase.expectedScores.structureScore.max);

      console.log(`${testCase.name} Results:`, result);
    });
  });

  test('Consistency across multiple runs', () => {
    const transcript = 'This is a test transcript about JavaScript programming.';
    const query = 'JavaScript programming';

    const results = Array(10).fill().map(() => analyzeTranscript(transcript, query));

    results.forEach((result, index) => {
      if (index > 0) {
        expect(result).toEqual(results[0]);
      }
    });
  });

  test('Handling of edge cases', () => {
    const edgeCases = [
      { transcript: '', query: 'test' },
      { transcript: 'a'.repeat(10000), query: 'a' },
      { transcript: 'JavaScript'.repeat(100), query: 'JavaScript' },
      { transcript: 'Normal transcript', query: '' },
    ];

    edgeCases.forEach(({ transcript, query }) => {
      expect(() => analyzeTranscript(transcript, query)).not.toThrow();
      const result = analyzeTranscript(transcript, query);
      expect(result).toHaveProperty('keywordRelevance');
      expect(result).toHaveProperty('readabilityScore');
      expect(result).toHaveProperty('structureScore');
    });
  });
});