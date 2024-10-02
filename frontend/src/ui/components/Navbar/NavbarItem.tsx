import colors from '../../../assets/styles/colors';
import { Link } from '@tanstack/react-router';
import { memo } from 'react';

interface NavbarItemProps {
  hideMenu: () => void;
  title: string;
  to: string;
}

const activeProps = {
  style: {
    color: colors.primary,
    fontWeight: 600,
  },
};

// we use memo to prevent too many re-renders of the component
const NavbarItem = memo(function ({ title, to, hideMenu }: NavbarItemProps) {
  const handleKeyDown = (e: React.KeyboardEvent<'a'>) => {
    if (['Enter', 'Escape'].includes(e.key)) {
      hideMenu();
    }
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
});

export default NavbarItem;
