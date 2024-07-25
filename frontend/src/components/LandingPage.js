import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  const fetchSearchHistory = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/history');
      const data = await response.json();
      setSearchHistory(data);
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };

  const handleSearch = (query) => {
    if (query) {
      navigate(`/loading?query=${encodeURIComponent(query)}`);
    } else {
      console.error('Search query is empty');
    }
  };

  return (
    <div className="landing-page">
      <header>
        <button className="auth-button">Sign Up / Login</button>
      </header>
      <main>
        <div className="content-wrapper">
          <div className="search-container">
            <SearchBar onSearch={handleSearch} />
          </div>
          {searchHistory.length > 0 && (
            <>
              <p className="previous-research-label">Previous research</p>
              <div className="research-blocks">
                {searchHistory.map((item, index) => (
                  <div key={index} className="research-block" onClick={() => handleSearch(item.query)}>
                    <h3>{item.query}</h3>
                    <p>{item.synopsis}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;