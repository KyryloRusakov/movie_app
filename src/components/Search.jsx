import React from 'react';

function Search({ searchQuery, handleSearchInputChange }) {
  return (
    <div className="movies-search-wrapper">
      <label htmlFor="search" className="movies-label">
        Search:
      </label>
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Enter movie title"
        className="movies-search"
      />
    </div>
  );
}

export default Search;
