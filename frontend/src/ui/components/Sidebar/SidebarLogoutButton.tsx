import { useTranslation } from 'react-i18next';
import colors from '@/assets/styles/colors';
import { memo, useCallback } from 'react';
import useLogout from '@/hooks/useLogout';
import LogoutIcon from '../Icons/Logout';
import classNames from 'classnames';

interface SidebarLogoutButtonProps {
  hideSidebar: () => void;
  isOpen: boolean;
}

const SidebarLogoutButton = memo(
  ({ hideSidebar, isOpen }: SidebarLogoutButtonProps) => {
    const { t } = useTranslation();
    const { handleLogout } = useLogout();

    const className = classNames('sidebar-link sidebar-logout-button', {
      opened: isOpen,
    });

    const handleClick = useCallback(() => {
      hideSidebar();
      handleLogout();
    }, [hideSidebar, handleLogout]);

    const toggleMenuOnKeyDown = useCallback(
      () => (e: React.KeyboardEvent) => {
        if (e.key === ' ') e.preventDefault();
        else if (e.key === 'Enter') {
          handleClick();
        } else if (e.key === 'Escape') {
          hideSidebar();
        }
      },
      [handleClick, hideSidebar],
    );

    return (
      <li
        aria-label={t('common.logout')}
        onKeyDown={toggleMenuOnKeyDown}
        className={className}
        onClick={handleClick}
        tabIndex={0}
        role="link"
      >
        <LogoutIcon width={24} height={24} stroke={colors.red} />
        <p>{t('common.logout')}</p>
      </li>
    );
  },
);

export default SidebarLogoutButton;
