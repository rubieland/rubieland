import CropPictureModalFooter from './CropPictureModalFooter';
import { RefObject, useEffect } from 'react';
import './styles/CropPictureModal.scss';
import i18n from '../../../core/i18n';
import {
  useModalIsOpen,
  useModalStoreActions,
} from '../../../stores/ModalStore';
import Modal from './Modal';

interface CropPictureModalProps {
  modalRef: RefObject<HTMLDialogElement>;
}

const modalKey = 'cropPictureModal';

const CropPictureModal = ({ modalRef }: CropPictureModalProps) => {
  const { closeModal, setRef } = useModalStoreActions();
  const isOpen = useModalIsOpen(modalKey);

  useEffect(() => {
    setRef(modalKey, modalRef);
  }, []);

  const crop = () => {
    console.log('CROP');
  };

  return (
    <Modal
      title={i18n.t('cropPictureModal.title')}
      closeModal={() => closeModal(modalKey)}
      modalRef={modalRef}
      isOpen={isOpen}
      //   height="85%"
      //   width="85%"
      footer={
        <CropPictureModalFooter
          toggleOpenModal={() => closeModal(modalKey)}
          crop={crop}
        />
      }
    >
      <p>Ma super modale</p>
      {/* TODO: add <Cropper /> component here */}
    </Modal>
  );
};

export default CropPictureModal;
