import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchResults } from './services/resultsServices';
import './ResultsPage.css';

// Helper function to format view count
const formatViewCount = (count) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  } else {
    return count.toString();
  }
};

const ResultsPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const query = params.get('query');
      
      if (!query) {
        setError('No search query provided');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchResults(query);
        setVideos(data.videos);
        setLoading(false);
      } catch (err) {
        console.error(err); // Log the actual error for debugging
        setError('Failed to fetch results. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  const handleHomeClick = () => {
    navigate('/');
  };

  if (loading) return <div className="loading">Loading results...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="results-page">
      <button className="home-button" onClick={handleHomeClick}>Home</button>
      <h1>Results for "{new URLSearchParams(location.search).get('query')}"</h1>
      
      <div className="results-container">
        <div className="result-column">
          <h2>Videos</h2>
          <div className="result-tiles">
            {videos.map((video, index) => (
              <div key={index} className="result-tile">
                <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                  <img src={video.thumbnail} alt={video.title} />
                  <h3>{video.title}</h3>
                </a>
                <p>{video.channelTitle}</p>
                <p>{formatViewCount(video.viewCount)} views</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;