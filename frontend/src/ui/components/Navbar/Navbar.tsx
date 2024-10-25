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
  const className: string = isOpen ? 'navbar opened' : 'navbar';

  // TODO: add language switcher

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const hideMenu = useCallback(() => {
    setTimeout(() => setIsOpen(false), 50);
  }, []);

  return (
    <nav>
      <BurgerMenuButton
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
        hideMenu={hideMenu}
      />
      <ul className={className}>
        <MainLinksBlock isConnected={isConnected} hideMenu={hideMenu} />

        {!isConnected && <AuthLinksBlock hideMenu={hideMenu} />}
      </ul>
    </nav>
  );
});

export default Navbar;
