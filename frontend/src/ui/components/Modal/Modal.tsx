import { PropsWithChildren, ReactNode } from 'react';
import i18n from '../../../core/i18n';
import Cross from '../Icons/Cross';
import './styles/Modal.scss';

interface ModalProps extends PropsWithChildren {
  toggleOpenModal: () => void;
  footer?: ReactNode;
  isOpen: boolean;
  height?: string;
  width?: string;
  title?: string;
}

const Modal = ({
  toggleOpenModal,
  children,
  isOpen,
  footer,
  title,
  height,
  width,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={toggleOpenModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        aria-describedby="modal-content"
        aria-labelledby="modal-title"
        style={{ width, height }}
        className="modal-wrapper"
        role="dialog"
      >
        <div
          aria-label={i18n.t('aria-labels.close-modal')}
          onClick={toggleOpenModal}
          className="modal-close-btn"
          role="button"
        >
          <Cross />
        </div>
        <div className="modal-header">
          {title && <h3 id="modal-title">{title}</h3>}
        </div>
        <div className="modal-content" id="modal-content">
          {children}
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
