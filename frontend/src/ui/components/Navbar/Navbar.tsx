import { useIsConnected } from '../../../stores/SessionStore';
import { useNavbarContext } from './providers/NavbarProvider';
import colors from '../../../assets/styles/colors';
import BurgerMenuButton from './BurgerMenuButton';
import { useTranslation } from 'react-i18next';
import AuthLinksBlock from './AuthLinksBlock';
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
  const { t } = useTranslation('', { keyPrefix: 'nav' });
  const { isOpen, hideMenu } = useNavbarContext();
  const className = isOpen ? 'navbar' : 'navbar hidden';
  const isConnected = useIsConnected();

  const hideOnEscapeKeyDown = (e: React.KeyboardEvent<'a'>) => {
    if (e.key === 'Escape') hideMenu();
  };

  const mainLinks = [
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
  ];

  return (
    <nav className={className}>
      <BurgerMenuButton />
      {mainLinks.map((link, i) => (
        <NavbarItem key={i} to={link.to} title={link.title} />
      ))}

      {!isConnected ? (
        <AuthLinksBlock />
      ) : (
        <Link
          className="navbar-link"
          onKeyDown={hideOnEscapeKeyDown}
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
