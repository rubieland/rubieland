import { useIsConnected } from '../../../stores/SessionStore';
import { memo, useCallback, useState } from 'react';
import BurgerMenuButton from './BurgerMenuButton';
import AuthLinksBlock from './AuthLinksBlock';
import MainLinksBlock from './MainLinksBlock';
import './styles/Navbar.scss';

// its parent (Header) is re-rendered many times, so we use memo to prevent re-rendering of this component
const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isConnected: boolean = useIsConnected();
  const className: string = isOpen ? 'navbar' : 'navbar hidden';

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const hideMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav className={className}>
      <BurgerMenuButton isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
      <MainLinksBlock isConnected={isConnected} hideMenu={hideMenu} />

      {!isConnected && <AuthLinksBlock hideMenu={hideMenu} />}
    </nav>
  );
});

export default Navbar;
