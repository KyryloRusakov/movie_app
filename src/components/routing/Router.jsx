import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import Movies from "../../pages/Movies";
import MovieDetail from "../../pages/MovieDetail";
import Favorites from "../../pages/Favorites";
import Error from "../../pages/Error";
import { RequireAuth } from "./RequireAuth";
import AuthProvider from "./AuthProvider";
import Profile from '../../pages/Profile';

const Router = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/movies"
          element={
            <RequireAuth>
              <Movies />
            </RequireAuth>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <RequireAuth>
              <MovieDetail />
            </RequireAuth>
          }
        />
        <Route
          path="/favorites"
          element={
            <RequireAuth>
              <Favorites />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthProvider>
  );
};

export default Router;
