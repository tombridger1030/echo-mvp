import React, { useState } from 'react';
import { extractTopic } from './utils/topicExtractor';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (searchQuery.trim() && typeof onSearch === 'function') {
        const extractedTopic = extractTopic(searchQuery);
        onSearch(searchQuery, extractedTopic);
      }
    }
  };

  return (
    <textarea
      className="search-bar"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyPress={handleSearch}
      placeholder="How can Echo help you today?"
      rows="2"
    />
  );
};

export default SearchBar;