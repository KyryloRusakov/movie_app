import { Routes, Route } from 'react-router-dom';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Movies from 'pages/Movies';
import MovieDetail from 'pages/MovieDetail';
import Favorites from 'pages/Favorites';
import Error from 'pages/Error';
import Profile from 'pages/Profile';
import { Layout } from 'components/Layout';
import AuthProvider from './AuthProvider';

const Router = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="/" element={<Layout />}>
        <Route path="movies" element={<Movies />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default Router;
