import ChevronLeftDouble from '../Icons/Chevrons/ChevronLeftDouble';
import colors from '../../../assets/styles/colors';
import { useTranslation } from 'react-i18next';
import './styles/SidebarToggleButton.scss';
import classNames from 'classnames';

interface SidebarToggleButtonProps {
  toggleIsOpen: () => void;
  isOpen: boolean;
}

const SidebarToggleButton = ({
  toggleIsOpen,
  isOpen,
}: SidebarToggleButtonProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'aria-labels' });
  const className = classNames('sidebar-toggle-btn', {
    hidden: !isOpen,
  });

  const toggleMenuOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') e.preventDefault();
    else if (e.key === 'Enter') {
      toggleIsOpen();
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
      <ChevronLeftDouble width={16} height={16} color={colors.grey70} />
    </div>
  );
};

export default SidebarToggleButton;
