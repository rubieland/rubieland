import ChevronRightDouble from '../Icons/Chevrons/ChevronRightDouble';
import colors from '../../../assets/styles/colors';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface SidebarToggleButtonProps {
  toggleIsOpen: () => void;
  hideSidebar: () => void;
  isOpen: boolean;
}

const SidebarToggleButton = ({
  toggleIsOpen,
  hideSidebar,
  isOpen,
}: SidebarToggleButtonProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'aria-labels' });
  const className = classNames('sidebar-toggle-btn', {
    opened: isOpen,
  });

  const toggleMenuOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') e.preventDefault();
    else if (e.key === 'Enter') {
      toggleIsOpen();
    } else if (e.key === 'Escape') {
      hideSidebar();
    }
  };

  return (
    <div
      aria-label={t('sidebar-toggle-btn')}
      onKeyDown={toggleMenuOnKeyDown}
      aria-expanded={isOpen}
      onClick={toggleIsOpen}
      className={className}
      role="button"
      tabIndex={0}
    >
      <ChevronRightDouble width={32} height={32} stroke={colors.grey80} />
    </div>
  );
};

export default SidebarToggleButton;
