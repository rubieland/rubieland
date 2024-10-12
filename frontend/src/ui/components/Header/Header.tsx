import useScrollPosition from '../../../hooks/useScrollYPosition';
import { useRef, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import AppLogo from './AppLogo';
import './Header.scss';

const Header = () => {
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
      <AppLogo />
      <Navbar />
    </header>
  );
};

export default Header;
