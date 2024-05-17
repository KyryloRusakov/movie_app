import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from 'pages/HomePage';
import { LoginPage } from 'pages/LoginPage';
import { SignUpPage } from 'pages/SignUpPage';
import { MoviesPage } from 'pages/MoviesPage';
import { SeriesPage } from 'pages/SeriesPage';
import { MovieDetailPage } from 'pages/MovieDetailPage';
import { FavoritesPage } from 'pages/FavoritesPage';
import { ProfilePage } from 'pages/ProfilePage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { Layout } from 'components/Layout';
import { AuthProvider } from './AuthProvider';

const Router = () => (
  <AuthProvider>
    <Routes>
      <Route path="/movie_app/login" element={<LoginPage />} />
      <Route path="/movie_app/signup" element={<SignUpPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/movie_app/movies" element={<MoviesPage />} />
        <Route path="/movie_app/series" element={<SeriesPage />} />
        <Route path="/movie_app/movie/:id" element={<MovieDetailPage />} />
        <Route path="/movie_app/favorites" element={<FavoritesPage />} />
        <Route path="/movie_app/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default Router;
