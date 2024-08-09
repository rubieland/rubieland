import { useNavbarContext } from './providers/NavbarProvider';
import colors from '../../../assets/styles/colors';
import '../../../assets/styles/_variables.scss';
import { Link } from '@tanstack/react-router';

interface NavbarItemProps {
  title: string;
  to: string;
}

const activeProps = {
  style: {
    fontWeight: 'bold',
    color: colors.red,
  },
};

const NavbarItem = ({ title, to }: NavbarItemProps) => {
  const { hideMenu } = useNavbarContext();

  const hideOnEscapeKeyDown = (e: React.KeyboardEvent<'a'>) => {
    if (e.key === 'Escape') hideMenu();
  };

  return (
    <Link
      onKeyDown={hideOnEscapeKeyDown}
      activeProps={activeProps}
      className="navbar-link"
      onClick={hideMenu}
      to={to}
    >
      {title}
    </Link>
  );
};

export default NavbarItem;
