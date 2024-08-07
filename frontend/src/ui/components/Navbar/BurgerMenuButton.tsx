import { useNavbarContext } from './providers/NavbarProvider';
import './styles/BurgerMenuButton.scss';
import i18n from '../../../core/i18n';

const BurgerMenuButton = () => {
  const { isOpen, toggleIsOpen } = useNavbarContext();
  const burgerBtnClassName = isOpen
    ? 'burger-menu-btn opened'
    : 'burger-menu-btn';
  const btnBarclassName = isOpen ? 'burger-menu-bar opened' : 'burger-menu-bar';

  return (
    <div
      aria-label={i18n.t('aria-labels.burger-btn')}
      className={burgerBtnClassName}
      aria-expanded={isOpen}
      onClick={toggleIsOpen}
      role="button"
    >
      <div className={btnBarclassName}></div>
      <div className={btnBarclassName}></div>
      <div className={btnBarclassName}></div>
    </div>
  );
};

export default BurgerMenuButton;
