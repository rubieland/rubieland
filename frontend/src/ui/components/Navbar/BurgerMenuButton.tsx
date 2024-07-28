import { useMenuIsActive } from './hooks/useMenuIsActive';
import './styles/BurgerMenuButton.scss';

const BurgerMenuButton = () => {
  const { toggleIsActive, isActive } = useMenuIsActive();

  return (
    <div
      className={isActive ? 'burger-menu-btn active' : 'burger-menu-btn'}
      onClick={toggleIsActive}
    >
      <div
        className={isActive ? 'burger-menu-bar active' : 'burger-menu-bar'}
      ></div>
      <div
        className={isActive ? 'burger-menu-bar active' : 'burger-menu-bar'}
      ></div>
      <div
        className={isActive ? 'burger-menu-bar active' : 'burger-menu-bar'}
      ></div>
    </div>
  );
};

export default BurgerMenuButton;
