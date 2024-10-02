import { useIsConnected } from '../../../stores/SessionStore';
import BurgerMenuButton from './BurgerMenuButton';
import { useCallback, useState } from 'react';
import AuthLinksBlock from './AuthLinksBlock';
import MainLinksBlock from './MainLinksBlock';
import './styles/Navbar.scss';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isConnected: boolean = useIsConnected();

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const hideMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const className: string = isOpen ? 'navbar' : 'navbar hidden';

  return (
    <nav className={className}>
      <BurgerMenuButton isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
      <MainLinksBlock isConnected={isConnected} hideMenu={hideMenu} />

      {!isConnected && <AuthLinksBlock hideMenu={hideMenu} />}
    </nav>
  );
};

export default Navbar;
