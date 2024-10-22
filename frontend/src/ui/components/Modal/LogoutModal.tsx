import { useTranslation } from 'react-i18next';
import GenericModal from './GenericModal';

interface LogoutModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
  onLogout: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const LogoutModal = ({
  onLogout,
  modalRef,
  onClose,
  isOpen,
}: LogoutModalProps) => {
  const { t } = useTranslation();

  return (
    <GenericModal
      confirmAction={onLogout}
      closeModal={onClose}
      modalRef={modalRef}
      isOpen={isOpen}
    >
      <span>{t('auth.confirmation.confirmLogout')}</span>
    </GenericModal>
  );
};

export default LogoutModal;
