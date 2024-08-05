import {
  useState,
  createContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

type NavbarContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleIsOpen: () => void;
  hideMenu: () => void;
};

const NavbarContext = createContext<NavbarContextType | null>(null);

export const NavbarProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const hideMenu = () => {
    setIsOpen(false);
  };

  return (
    <NavbarContext.Provider
      value={{ isOpen, setIsOpen, toggleIsOpen, hideMenu }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => {
  const navbarContext = useContext(NavbarContext);

  if (!navbarContext) {
    throw new Error('useNavbarContext has to be used within <NavbarProvider>');
  }

  return navbarContext;
};
