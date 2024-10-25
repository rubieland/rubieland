import DeleteAccountModal from '@/ui/components/Modal/DeleteAccountModal';
import useDeleteMyAccountModal from '../hooks/useDeleteMyAccountModal';
import CustomButton from '@/ui/components/Button/CustomButton';
import PageLoader from '@/ui/components/Loader/PageLoader';
import DeleteUser from '@/ui/components/Icons/DeleteUser';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

const DeleteAccountSection = () => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const {
    handleDeleteMyAccountAndCloseModal,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    isPending,
  } = useDeleteMyAccountModal();

  if (isPending) return <PageLoader isLoading={isPending} />;
  return (
    <>
      <section className="action-button-section">
        <CustomButton
          icon={<DeleteUser width={20} height={20} />}
          title={t('pages.profile.deleteAccount')}
          onClick={handleOpenModal}
          iconPosition="right"
          style="error"
          outlined
        />
      </section>
      <DeleteAccountModal
        onDelete={handleDeleteMyAccountAndCloseModal}
        onClose={handleCloseModal}
        isOpen={isModalOpen}
        modalRef={modalRef}
      />
    </>
  );
};

export default DeleteAccountSection;
