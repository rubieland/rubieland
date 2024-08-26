import { useNavbarContext } from './providers/NavbarProvider';
import BurgerMenuButton from './BurgerMenuButton';
import i18n from '../../../core/i18n';
import AuthLinksBlock from './AuthLinksBlock';
import NavbarItem from './NavbarItem';
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

const Navbar = () => {
  const { isOpen } = useNavbarContext();
  const className = isOpen ? 'navbar' : 'navbar hidden';

  return (
    <nav className={className}>
      <BurgerMenuButton />
      {mainLinks.map((link, i) => (
        <NavbarItem key={i} to={link.to} title={link.title} />
      ))}
      <AuthLinksBlock />
    </nav>
  );
};

export default Navbar;
