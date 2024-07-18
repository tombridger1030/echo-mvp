import React, { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Searching for:', searchQuery);
      // TODO: Implement search functionality
    }
  };

  return (
    <input
      type="text"
      className="search-bar"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyPress={handleSearch}
      placeholder="How can Echo help you today?"
    />
  );
};

export default SearchBar;