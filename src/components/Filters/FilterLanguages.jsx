import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedLanguage } from '../../store/movieSlice';

const Filter = ({ selectedLanguage, languages }) => {
  const dispatch = useDispatch();

  const handleLanguageChange = (event) => {
    dispatch(setSelectedLanguage(event.target.value));
  };

  return (
    <div>
      <label htmlFor="language" className="movies-label">
        Languages:
      </label>
      <select
        id="language"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="movies-select"
      >
        <option value="">All</option>
        {languages.map((language) => (
          <option key={language.iso_639_1} value={language.iso_639_1}>
            {language.english_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
