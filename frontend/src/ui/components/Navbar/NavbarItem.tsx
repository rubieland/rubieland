import colors from '../../../assets/styles/colors';
import { LinkType } from '../../../types/links';
import { Link } from '@tanstack/react-router';
import { memo } from 'react';

interface NavbarItemProps {
  hideMenu: () => void;
  link: LinkType;
}

const activeProps = {
  style: {
    color: colors.primary,
    fontWeight: 600,
  },
};

// we use memo to prevent too many re-renders of the component
const NavbarItem = memo(({ link, hideMenu }: NavbarItemProps) => {
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
      to={link.to}
    >
      {link.title}
    </Link>
  );
});

export default NavbarItem;
