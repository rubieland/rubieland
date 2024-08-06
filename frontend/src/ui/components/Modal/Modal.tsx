import { PropsWithChildren, ReactNode } from 'react';
import Cross from '../Icons/Cross';
import './styles/Modal.scss';

interface ModalProps extends PropsWithChildren {
  toggleOpenModal: () => void;
  footer?: ReactNode;
  height?: string;
  width?: string;
  title?: string;
}

const Modal = ({
  toggleOpenModal,
  children,
  footer,
  title,
  height,
  width,
}: ModalProps) => {
  return (
    <div className="modal-overlay" onClick={toggleOpenModal}>
      <div
        className="modal-wrapper"
        style={{ width, height }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          {title && <h3>{title}</h3>}
          <div className="modal-close-icon" onClick={toggleOpenModal}>
            <Cross height={36} width={36} />
          </div>
        </div>
        <div className="modal-content">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
