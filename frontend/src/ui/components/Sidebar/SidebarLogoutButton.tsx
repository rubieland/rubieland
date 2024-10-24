import useLogoutModal from '@/ui/pages/Profile/hooks/useLogoutModal';
import { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LogoutModal from '../Modal/LogoutModal';
import PageLoader from '../Loader/PageLoader';
import colors from '@/assets/styles/colors';
import LogoutIcon from '../Icons/Logout';
import classNames from 'classnames';

interface SidebarLogoutButtonProps {
  hideSidebar: () => void;
  isOpen: boolean;
}

const SidebarLogoutButton = memo(
  ({ hideSidebar, isOpen }: SidebarLogoutButtonProps) => {
    const { t } = useTranslation();

    const modalRef = useRef<HTMLDialogElement>(null);
    const {
      handleLogoutAndCloseModal,
      handleCloseModal,
      handleOpenModal,
      isModalOpen,
      isPending,
    } = useLogoutModal();

    const className = classNames('sidebar-link sidebar-logout-button', {
      opened: isOpen,
    });

    const handleClick = useCallback(() => {
      hideSidebar();
      handleOpenModal();
    }, [hideSidebar, handleOpenModal]);

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

    if (isPending) return <PageLoader isLoading={isPending} />;

    return (
      <>
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
        <LogoutModal
          onLogout={handleLogoutAndCloseModal}
          onClose={handleCloseModal}
          isOpen={isModalOpen}
          modalRef={modalRef}
        />
      </>
    );
  },
);

export default SidebarLogoutButton;
