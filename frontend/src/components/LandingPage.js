import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import ResearchBlocks from './ResearchBlocks';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSearch = (query, topic) => {
    navigate(`/loading?query=${encodeURIComponent(query)}&topic=${encodeURIComponent(topic)}`);
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
          <p className="previous-research-label">Previous research</p>
          <ResearchBlocks />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;