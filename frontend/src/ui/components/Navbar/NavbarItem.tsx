import { useNavbarContext } from './providers/NavbarProvider';
import colors from '../../../assets/styles/colors';
import '../../../assets/styles/_variables.scss';
import { Link } from '@tanstack/react-router';
import { handleKeyDownAction } from '../../../utils/keyboard.utils';

interface NavbarItemProps {
  title: string;
  to: string;
}

const activeProps = {
  style: {
    color: colors.primary,
    fontWeight: 600,
  },
};

const NavbarItem = ({ title, to }: NavbarItemProps) => {
  const { hideMenu } = useNavbarContext();

  const handleKeyDown = (e: React.KeyboardEvent<'a'>) => {
    handleKeyDownAction({
      e,
      keys: ['Enter', 'Escape'],
      action: hideMenu,
    });
  };

  return (
    <Link
      onKeyDown={handleKeyDown}
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
