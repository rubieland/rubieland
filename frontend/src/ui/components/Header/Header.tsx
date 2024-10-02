import useScrollPosition from '../../../hooks/useScrollYPosition';
import colors from '../../../assets/styles/colors';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { useRef, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Logo from '../Logo/Logo';
import './Header.scss';

const Header = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'aria-labels' });
  const scrollY: number = useScrollPosition();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      if (scrollY > 40) {
        headerRef.current.classList.add('header-scrolled');
      } else {
        headerRef.current.classList.remove('header-scrolled');
      }
    }
  }, [scrollY]);

  return (
    <header ref={headerRef} className="app-header">
      <div className="app-logo-container">
        <Link to="/" aria-label={t('app-logo')} role="link">
          <Logo color={colors.primary} />
        </Link>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
