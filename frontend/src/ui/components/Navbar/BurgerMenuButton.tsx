import { useNavbarContext } from './providers/NavbarProvider';
import './styles/BurgerMenuButton.scss';

const BurgerMenuButton = () => {
  const { isOpen, toggleIsOpen } = useNavbarContext();

  return (
    <div
      className={isOpen ? 'burger-menu-btn opened' : 'burger-menu-btn'}
      onClick={toggleIsOpen}
    >
      <div
        className={isOpen ? 'burger-menu-bar opened' : 'burger-menu-bar'}
      ></div>
      <div
        className={isOpen ? 'burger-menu-bar opened' : 'burger-menu-bar'}
      ></div>
      <div
        className={isOpen ? 'burger-menu-bar opened' : 'burger-menu-bar'}
      ></div>
    </div>
  );
};

export default BurgerMenuButton;
