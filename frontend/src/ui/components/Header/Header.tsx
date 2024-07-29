import { NavbarProvider } from '../Navbar/providers/NavbarProvider';
import Navbar from '../Navbar/Navbar';
import Logo from '../Logo/Logo';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <Logo color="#7e57c2" />
      <NavbarProvider>
        <Navbar />
      </NavbarProvider>
    </header>
  );
};

export default Header;
