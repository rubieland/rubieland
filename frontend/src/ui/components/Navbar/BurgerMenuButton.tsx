import { useNavbarContext } from './providers/NavbarProvider';
import { useTranslation } from 'react-i18next';
import './styles/BurgerMenuButton.scss';

const BurgerMenuButton = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'aria-labels' });
  const { isOpen, toggleIsOpen, hideMenu } = useNavbarContext();
  const burgerBtnClassName = isOpen
    ? 'burger-menu-btn opened'
    : 'burger-menu-btn';
  const btnBarclassName = isOpen ? 'burger-menu-bar opened' : 'burger-menu-bar';

  const handleToggleIsOpen = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    toggleIsOpen();
  };

  // ACCESSIBILITY: handle keyboard events to show/hide menu
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        handleToggleIsOpen(event);
        break;
      case 'Escape':
        hideMenu();
        break;
      default:
        break;
    }
  };

  return (
    <div
      aria-label={t('burger-btn')}
      className={burgerBtnClassName}
      onKeyDown={handleKeyDown}
      aria-expanded={isOpen}
      onClick={toggleIsOpen}
      role="button"
      tabIndex={0}
    >
      <div className={btnBarclassName}></div>
      <div className={btnBarclassName}></div>
      <div className={btnBarclassName}></div>
    </div>
  );
};

export default BurgerMenuButton;
