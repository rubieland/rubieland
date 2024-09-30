import { useScrollYPosition } from '../../../hooks/useScrollYPosition';
import { NavbarProvider } from '../Navbar/providers/NavbarProvider';
import colors from '../../../assets/styles/colors';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import Navbar from '../Navbar/Navbar';
import classNames from 'classnames';
import Logo from '../Logo/Logo';
import './Header.scss';

const Header = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'aria-labels' });
  const scrollYPosition = useScrollYPosition();
  const className = classNames('app-header', {
    'header-scrolled': scrollYPosition > 0,
  });

  return (
    <header className={className}>
      <div className="app-logo-container">
        <Link to="/" aria-label={t('app-logo')} role="link">
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
