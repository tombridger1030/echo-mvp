import React from "react";
import Navigation from './Navigation';



const HomePage =() => {
  return(
    <div>
      <Navigation />
      <div className="home-page">
        <h1>Welcome to Echo Learning Platform</h1>
        <p>Discover a new way of learning with AI-powered courses</p>
        <button>Explore Courses</button>
        <p>New to Echo? <a href = "/register">Register here</a></p>
      </div>
    </div>
    
);
};

export default HomePage;