import { NavbarProvider } from '../Navbar/providers/NavbarProvider';
import colors from '../../../assets/styles/colors';
import { Link } from '@tanstack/react-router';
import i18n from '../../../core/i18n';
import Navbar from '../Navbar/Navbar';
import Logo from '../Logo/Logo';
import './Header.scss';

const Header = () => {
  return (
    <header className="app-header">
      <div className="app-logo-container">
        <Link to="/" aria-label={i18n.t('aria-labels.app-logo')} role="link">
          <Logo color={colors.primary} />
        </Link>
      </div>
      <NavbarProvider>
        <Navbar />
      </NavbarProvider>
    </header>
  );
};

export default Header;
