// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';  // Search icon

const SearchBar = ({ onSearch }) => {
  const [showInput, setShowInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);  // Call the onSearch function passed from the parent
  };

  return (
    <div className="flex items-center mb-4">
      <button
        onClick={() => setShowInput(!showInput)}
        className="mr-2 bg-gray-300 p-2 rounded hover:bg-gray-400"
      >
        <FaSearch />
      </button>
      {showInput && (
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 rounded"
        />
      )}
    </div>
  );
};

export default SearchBar;
