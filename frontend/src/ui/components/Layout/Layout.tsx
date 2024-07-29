import { Outlet } from '@tanstack/react-router';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.scss';

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
