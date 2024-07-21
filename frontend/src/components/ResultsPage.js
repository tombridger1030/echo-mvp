import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchResults } from './services/resultsServices';
import './ResultsPage.css';

const ResultsPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const topic = params.get('topic');
      
      try {
        const data = await fetchResults(topic);
        setVideos(data.videos);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch results. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  if (loading) return <div className="loading">Loading results...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="results-page">
      <h1>Results for "{new URLSearchParams(location.search).get('topic')}"</h1>
      
      <div className="results-container">
        <div className="result-column">
          <h2>Videos</h2>
          <div className="result-tiles">
            {videos.map((video, index) => (
              <a key={index} href={video.link} target="_blank" rel="noopener noreferrer" className="result-tile">
                <img src={video.thumbnail} alt={video.title} />
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;