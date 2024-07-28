import { useMenuIsActive } from './hooks/useMenuIsActive';
import { Link } from '@tanstack/react-router';

interface NavbarItemProps {
  title: string;
  to: string;
}

const activeProps = {
  style: {
    fontWeight: 'bold',
    color: 'red',
  },
};

const NavbarItem = ({ title, to }: NavbarItemProps) => {
  const { removeIsActive } = useMenuIsActive();

  return (
    <Link onClick={removeIsActive} to={to} activeProps={activeProps}>
      {title}
    </Link>
  );
};

export default NavbarItem;
