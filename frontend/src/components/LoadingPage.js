import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LoadingPage.css';

const LoadingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      setSearchQuery(query);
      // Redirect to results page after 3 seconds
      const timer = setTimeout(() => {
        navigate(`/results?query=${encodeURIComponent(query)}`);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      console.error('No search query provided');
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <div className="loading-page">
      <div className="loading-content">
        <h1>Echo is scanning resources for "{searchQuery}"</h1>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingPage;