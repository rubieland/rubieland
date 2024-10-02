import { useIsConnected } from '../../../stores/SessionStore';
import colors from '../../../assets/styles/colors';
import BurgerMenuButton from './BurgerMenuButton';
import { useTranslation } from 'react-i18next';
import AuthLinksBlock from './AuthLinksBlock';
import { useCallback, useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import NavbarItem from './NavbarItem';
import './styles/Navbar.scss';

const activeProps = {
  style: {
    color: colors.primary,
    fontWeight: 600,
  },
};

const Navbar = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'nav' });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isConnected: boolean = useIsConnected();

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const hideMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const className: string = isOpen ? 'navbar' : 'navbar hidden';

  const mainLinks = useMemo(
    () => [
      {
        title: t('home'),
        to: '/',
      },
      {
        title: t('about'),
        to: '/about',
      },
      {
        title: t('blog'),
        to: '/blog',
      },
    ],
    [t],
  );

  return (
    <nav className={className}>
      <BurgerMenuButton isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
      {mainLinks.map((link, i) => (
        <NavbarItem
          key={i}
          to={link.to}
          title={link.title}
          hideMenu={hideMenu}
        />
      ))}

      {!isConnected ? (
        <AuthLinksBlock hideMenu={hideMenu} />
      ) : (
        <Link
          className="navbar-link"
          activeProps={activeProps}
          onClick={hideMenu}
          to="/profile"
        >
          {t('profile')}
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
