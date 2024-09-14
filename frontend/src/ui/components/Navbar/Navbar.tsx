import { useIsConnected } from '../../../stores/SessionStore';
import { useNavbarContext } from './providers/NavbarProvider';
import colors from '../../../assets/styles/colors';
import BurgerMenuButton from './BurgerMenuButton';
import AuthLinksBlock from './AuthLinksBlock';
import { Link } from '@tanstack/react-router';
import NavbarItem from './NavbarItem';
import i18n from '../../../core/i18n';
import './styles/Navbar.scss';

const mainLinks = [
  {
    title: i18n.t('nav.home'),
    to: '/',
  },
  {
    title: i18n.t('nav.about'),
    to: '/about',
  },
  {
    title: i18n.t('nav.blog'),
    to: '/blog',
  },
];

const activeProps = {
  style: {
    color: colors.primary,
    fontWeight: 600,
  },
};

const Navbar = () => {
  const { isOpen, hideMenu } = useNavbarContext();
  const className = isOpen ? 'navbar' : 'navbar hidden';
  const isConnected = useIsConnected();

  const hideOnEscapeKeyDown = (e: React.KeyboardEvent<'a'>) => {
    if (e.key === 'Escape') hideMenu();
  };

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
          {i18n.t('nav.profile')}
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
