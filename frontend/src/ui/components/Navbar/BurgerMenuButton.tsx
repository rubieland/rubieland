import { handleKeyDownAction } from '../../../utils/keyboard.utils';
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

  // ACCESSIBILITY: handle keyboard events to show/hide menu
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    handleKeyDownAction({
      e,
      keys: ['Enter'],
      action: toggleIsOpen,
      additionalKeys: ['Escape'],
      additionalAction: hideMenu,
    });
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
