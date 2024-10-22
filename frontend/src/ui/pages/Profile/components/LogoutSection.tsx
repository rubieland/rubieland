import CustomButton from '@/ui/components/Button/CustomButton';
import LogoutModal from '@/ui/components/Modal/LogoutModal';
import PageLoader from '@/ui/components/Loader/PageLoader';
import LogoutIcon from '@/ui/components/Icons/Logout';
import useLogoutModal from '../hooks/useLogoutModal';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

const LogoutSection = () => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const {
    handleLogoutAndCloseModal,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    isPending,
  } = useLogoutModal();

  if (isPending) return <PageLoader isLoading={isPending} />;

  return (
    <>
      <section className="action-button-section">
        <CustomButton
          icon={<LogoutIcon width={20} height={20} />}
          title={t('common.logout')}
          onClick={handleOpenModal}
          iconPosition="right"
          style="error"
          outlined
        />
      </section>
      <LogoutModal
        onLogout={handleLogoutAndCloseModal}
        onClose={handleCloseModal}
        isOpen={isModalOpen}
        modalRef={modalRef}
      />
    </>
  );
};

export default LogoutSection;
