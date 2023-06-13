import React from "react";

const Filter = ({ selectedLanguage, handleLanguageChange, languages }) => {
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
