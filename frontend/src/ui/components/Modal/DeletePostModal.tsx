import GenericModal from './GenericModal';
import { Trans } from 'react-i18next';

interface DeletePostModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
  onClose: () => void;
  onDelete: () => void;
  isOpen: boolean;
}

const DeletePostModal = ({
  modalRef,
  onDelete,
  onClose,
  isOpen,
}: DeletePostModalProps) => {
  return (
    <GenericModal
      confirmAction={onDelete}
      closeModal={onClose}
      modalRef={modalRef}
      isOpen={isOpen}
    >
      {/* we use <Trans> component from i18next to translate the text inside the span with a part of the text in bold  */}
      <span>
        <Trans i18nKey="form.post.confirmation.confirmPostDelete">
          Êtes-vous sûr(e) de vouloir supprimer cet article ?{' '}
          <strong>Cette action est irréversible.</strong>
        </Trans>
      </span>
    </GenericModal>
  );
};

export default DeletePostModal;
