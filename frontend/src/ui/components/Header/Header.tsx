import { NavbarProvider } from '../Navbar/providers/NavbarProvider';
import colors from '../../../assets/styles/colors';
import { Link } from '@tanstack/react-router';
import Navbar from '../Navbar/Navbar';
import Logo from '../Logo/Logo';
import './Header.scss';

const Header = () => {
  return (
    <header>
      <Link to="/">
        <Logo color={colors.primary} />
      </Link>
      <NavbarProvider>
        <Navbar />
      </NavbarProvider>
    </header>
  );
};

export default Header;
