import { useDispatch } from 'react-redux';
import { setSelectedGenre } from '../../store/movieSlice';

const Filter = ({ selectedGenre, genres }) => {
  const dispatch = useDispatch();

  const handleGenreChange = (event) => {
    dispatch(setSelectedGenre(event.target.value));
  };

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

export default Filter;
