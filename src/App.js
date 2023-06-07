import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';


function App() {
  

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
