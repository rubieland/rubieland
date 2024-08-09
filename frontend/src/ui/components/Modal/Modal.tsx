import { PropsWithChildren, RefObject } from 'react';
import i18n from '../../../core/i18n';
import Cross from '../Icons/Cross';
import './styles/Modal.scss';

interface ModalProps extends PropsWithChildren {
  modalRef: RefObject<HTMLDialogElement>;
  closeModal: () => void;
  footer?: React.ReactNode;
  isOpen: boolean;
  height?: string;
  width?: string;
  title?: string;
}

const Modal = ({
  closeModal,
  modalRef,
  children,
  footer,
  height,
  width,
  title,
}: ModalProps) => {
  // close modal when click on the backdrop
  const handlecloseModal = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>,
  ) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  // close modal when spacebar in pressed (when the X icon button is focused)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') {
      closeModal();
    }
  };

  return (
    <dialog
      onClick={(e) => handlecloseModal(e)}
      style={{ height, width }}
      ref={modalRef}
      role="dialog"
    >
      <header className="modal-header">
        {title && <h3 id="modal-title">{title}</h3>}
      </header>
      <div
        aria-label={i18n.t('aria-labels.close-modal')}
        className="modal-close-btn"
        onClick={closeModal}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <Cross />
      </div>
      <section className="modal-content" id="modal-content">
        {children}
      </section>
      {footer && <footer className="modal-footer">{footer}</footer>}
    </dialog>
  );
};

export default Modal;
