import { Link } from '@tanstack/react-router';
import { useNavbarContext } from './providers/NavbarProvider';
import '../../../assets/styles/_variables.scss';

interface NavbarItemProps {
  title: string;
  to: string;
}

const activeProps = {
  style: {
    fontWeight: 'bold',
    color: '#ef5350',
  },
};

const NavbarItem = ({ title, to }: NavbarItemProps) => {
  const { hideMenu } = useNavbarContext();

  return (
    <Link
      className="navbar-link"
      onClick={hideMenu}
      to={to}
      activeProps={activeProps}
    >
      {title}
    </Link>
  );
};

export default NavbarItem;
