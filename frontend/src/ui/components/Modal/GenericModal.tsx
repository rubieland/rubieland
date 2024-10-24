import React, { PropsWithChildren, RefObject, useEffect } from 'react';
import CustomButton from '../Button/CustomButton';
import { useTranslation } from 'react-i18next';
import Cross from '../Icons/Cross';
import './styles/Modal.scss';

interface GenericModalProps extends PropsWithChildren {
  modalRef: RefObject<HTMLDialogElement>;
  confirmButtonTitle?: string;
  confirmAction: () => void;
  closeModal: () => void;
  isOpen: boolean;
  title?: string;
}

const GenericModal = ({
  confirmButtonTitle,
  confirmAction,
  closeModal,
  modalRef,
  children,
  isOpen,
  title,
}: GenericModalProps) => {
  const { t } = useTranslation();

  // show or hide the modal
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
    <dialog onClick={handleCloseModal} ref={modalRef} role="dialog">
      <header className="modal-header">
        {title && <p id="modal-title">{title}</p>}
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
        <CustomButton
          title={t('common.cancel')}
          onClick={closeModal}
          style="error"
        />
        <CustomButton
          title={confirmButtonTitle || t('common.confirm')}
          onClick={confirmAction}
          style="success"
        />
      </footer>
    </dialog>
  );
};

export default GenericModal;
