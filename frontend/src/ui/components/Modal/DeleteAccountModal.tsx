import GenericModal from './GenericModal';
import { Trans } from 'react-i18next';

interface DeleteAccountModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
  onDelete: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const DeleteAccountModal = ({
  onDelete,
  modalRef,
  onClose,
  isOpen,
}: DeleteAccountModalProps) => {
  return (
    <GenericModal
      confirmAction={onDelete}
      closeModal={onClose}
      modalRef={modalRef}
      isOpen={isOpen}
    >
      {/* we use <Trans> component from i18next to translate the text inside the span with a part of the text in bold  */}
      <span>
        <Trans i18nKey="form.user.confirmation.confirmAccountDelete">
          Êtes-vous sûr(e) de vouloir supprimer votre compte ?{' '}
          <strong>Toutes vos données seront supprimées.</strong>
        </Trans>
      </span>
    </GenericModal>
  );
};

export default DeleteAccountModal;
