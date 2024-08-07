import { useNavbarContext } from './providers/NavbarProvider';
import useFocusElement from '../../../hooks/useFocusElement';
import './styles/BurgerMenuButton.scss';
import i18n from '../../../core/i18n';
import { useRef } from 'react';

const BurgerMenuButton = () => {
  const { isOpen, toggleIsOpen, hideMenu } = useNavbarContext();
  const burgerBtnRef = useRef<HTMLDivElement>(null);
  const burgerBtnClassName = isOpen
    ? 'burger-menu-btn opened'
    : 'burger-menu-btn';
  const btnBarclassName = isOpen ? 'burger-menu-bar opened' : 'burger-menu-bar';

  const handleToggleIsOpen = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    toggleIsOpen();
  };

  // ACCESSIBILITY: allow focus with tab keys
  useFocusElement({ ref: burgerBtnRef });

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
      aria-label={i18n.t('aria-labels.burger-btn')}
      className={burgerBtnClassName}
      onKeyDown={handleKeyDown}
      aria-expanded={isOpen}
      onClick={toggleIsOpen}
      ref={burgerBtnRef}
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
