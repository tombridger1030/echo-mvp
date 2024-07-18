import React from 'react';
import SearchBar from './SearchBar';
import ResearchBlocks from './ResearchBlocks';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <button className="auth-button">Sign Up / Login</button>
      </header>
      <main>
        <div className="content-wrapper">
          <SearchBar />
          <p className="previous-research-label">Previous research</p>
          <ResearchBlocks />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;