import React from 'react'

const Filter = ({ selectedGenre, handleGenreChange, genres }) => {
  return (
    <div>
      <label htmlFor="genres" className="movies-label">
        Genres:
      </label>
      <select
        id="genres"
        value={selectedGenre}
        onChange={handleGenreChange}
        className="movies-select"
      >
        <option value="">All</option>
        {genres.map((filter) => (
          <option key={filter.id} value={filter.id}>
            {filter.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter