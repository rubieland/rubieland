import { PropsWithChildren, RefObject, useEffect } from 'react';
import CustomButton from '../Button/CustomButton';
import { useTranslation } from 'react-i18next';
import Cross from '../Icons/Cross';
import './styles/Modal.scss';

interface ModalProps extends PropsWithChildren {
  modalRef: RefObject<HTMLDialogElement>;
  confirmButtonTitle?: string;
  cancelButtonTitle?: string;
  hasCancelButton?: boolean;
  confirmAction: () => void;
  cancelAction?: () => void;
  closeModal: () => void;
  isOpen: boolean;
  height?: string;
  width?: string;
  title?: string;
}

const Modal = ({
  confirmButtonTitle,
  cancelButtonTitle,
  hasCancelButton,
  confirmAction,
  cancelAction,
  closeModal,
  modalRef,
  children,
  isOpen,
  height,
  width,
  title,
}: ModalProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        modalRef.current.showModal();
      } else {
        modalRef.current.close();
      }
    }
  }, [isOpen, modalRef]);

  // close modal when click on the backdrop
  const handleCloseModal = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>,
  ) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  // close modal when Enter key is pressed (when the X icon button is focused)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') e.preventDefault();
    else if (e.key === 'Enter') {
      e.preventDefault();
      closeModal();
    }
  };

  return (
    <dialog
      onClick={handleCloseModal}
      style={{ height, width }}
      ref={modalRef}
      role="dialog"
    >
      <header className="modal-header">
        {title && <h3 id="modal-title">{title}</h3>}
      </header>
      <div
        aria-label={t('aria-labels.close-modal')}
        className="modal-close-btn"
        onKeyDown={handleKeyDown}
        onClick={closeModal}
        role="button"
        tabIndex={0}
      >
        <Cross />
      </div>
      <section className="modal-content" id="modal-content">
        {children}
      </section>
      <footer className="modal-footer">
        {hasCancelButton && (
          <CustomButton
            title={cancelButtonTitle || t('common.cancel')}
            onClick={cancelAction || closeModal}
            style="error"
          />
        )}
        <CustomButton
          title={confirmButtonTitle || t('common.confirm')}
          onClick={confirmAction}
        />
      </footer>
    </dialog>
  );
};

export default Modal;
