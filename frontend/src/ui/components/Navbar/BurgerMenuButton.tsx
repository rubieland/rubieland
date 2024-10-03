import { useTranslation } from 'react-i18next';
import './styles/BurgerMenuButton.scss';
import classNames from 'classnames';
import { memo } from 'react';

interface BurgerMenuButtonProps {
  toggleIsOpen: () => void;
  hideMenu: () => void;
  isOpen: boolean;
}

// we use memo to prevent too many re-renders of the component
const BurgerMenuButton = memo(
  ({ toggleIsOpen, hideMenu, isOpen }: BurgerMenuButtonProps) => {
    const { t } = useTranslation('translation', { keyPrefix: 'aria-labels' });

    const burgerBtnClassName = classNames('burger-menu-btn', {
      opened: isOpen,
    });
    const btnBarclassName = classNames('burger-menu-bar', {
      opened: isOpen,
    });

    const toggleMenuOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') e.preventDefault();
      else if (e.key === 'Enter') {
        toggleIsOpen();
      } else if (e.key === 'Escape') {
        hideMenu();
      }
    };

    return (
      <div
        onKeyDown={toggleMenuOnKeyDown}
        className={burgerBtnClassName}
        aria-label={t('burger-btn')}
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
  },
);

export default BurgerMenuButton;
