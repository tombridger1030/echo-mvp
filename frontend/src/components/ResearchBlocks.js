import React from 'react';

const ResearchBlocks = () => {
  // This would typically come from a backend or state management
  const previousResearch = [
    { title: "Machine Learning Basics", summary: "An overview of fundamental ML concepts and algorithms." },
    { title: "Web Development Trends 2024", summary: "Analysis of current trends in web development technologies." },
    { title: "Data Science in Healthcare", summary: "Exploration of data science applications in modern healthcare." },
  ];

  return (
    <div className="research-blocks">
      {previousResearch.map((research, index) => (
        <div key={index} className="research-block">
          <h3>{research.title}</h3>
          <p>{research.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default ResearchBlocks;