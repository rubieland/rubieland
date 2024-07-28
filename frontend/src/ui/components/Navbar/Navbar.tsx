import BurgerMenuButton from './BurgerMenuButton';
import NavbarItem from './NavbarItem';

const links = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'About',
    to: '/about',
  },
];

const Navbar = () => {
  return (
    <nav className="menu">
      {links.map((link, i) => (
        <NavbarItem key={i} to={link.to} title={link.title} />
      ))}
      <BurgerMenuButton />
    </nav>
  );
};

export default Navbar;
