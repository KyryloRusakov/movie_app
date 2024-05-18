import { Navigate } from 'react-router-dom';
import { useAuth } from 'hook/useAuth';

const HomePage = () => {
  const { isAuth } = useAuth();

  return isAuth ? (
    <div className="container" style={{ color: 'white', fontSize: '24px' }}>
      {/* What&apos;s Popular */}
      <div style={{ marginBottom: '20px' }}>Welcome to React Movie Application.</div>
      <div style={{ marginBottom: '20px', width: '730px', lineHeight: 1.2 }}>
        For now you can go to the Movies page and watch popular movies.
        They can be sorted by genre and language.
        You can also find the movie by using the search field.
      </div>
      <div style={{ marginBottom: '20px', width: '730px', lineHeight: 1.2 }}>
        You can also click on a specific movie and go to the detail page.
        There you can add the movie to your Favorites
        and they will be displayed on the Favorites page.
      </div>
      <div>On the profile page you can log out and edit your own data</div>
    </div>
  ) : (
    <Navigate to="/movie_app/login" />
  );
};
export { HomePage };
