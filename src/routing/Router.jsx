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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="series" element={<SeriesPage />} />
        <Route path="movie/:id" element={<MovieDetailPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default Router;
