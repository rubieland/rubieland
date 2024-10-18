import { NavbarContext } from './NavbarProvider';
import { useContext } from 'react';

export const useNavbarContext = () => {
  const navbarContext = useContext(NavbarContext);

  if (!navbarContext) {
    throw new Error('useNavbarContext has to be used within <NavbarProvider>');
  }

  return navbarContext;
};
