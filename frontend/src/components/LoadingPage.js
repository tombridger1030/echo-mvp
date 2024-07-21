import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LoadingPage.css';

const LoadingPage = () => {
  const [topic, setTopic] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setTopic(params.get('topic') || '');

    // Redirect to results page after 3 seconds
    const timer = setTimeout(() => {
      navigate(`/results?topic=${params.get('topic')}`);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location, navigate]);

  return (
    <div className="loading-page">
      <div className="loading-content">
        <h1>Echo is scanning resources for {topic}</h1>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingPage;