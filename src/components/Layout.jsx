import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

const Layout = () => (
  <>
    <Header />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </>
);
export { Layout };
