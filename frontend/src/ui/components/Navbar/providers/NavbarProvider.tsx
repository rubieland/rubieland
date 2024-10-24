import {
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
  Dispatch,
} from 'react';

type NavbarContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleIsOpen: () => void;
  hideMenu: () => void;
};

export const NavbarContext = createContext<NavbarContextType | null>(null);

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
