import { useNavbarContext } from './providers/NavbarProvider';
import BurgerMenuButton from './BurgerMenuButton';
import i18n from '../../../core/i18n';
import NavbarItem from './NavbarItem';
import './styles/Navbar.scss';

const links = [
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
      {links.map((link, i) => (
        <NavbarItem key={i} to={link.to} title={link.title} />
      ))}
    </nav>
  );
};

export default Navbar;
