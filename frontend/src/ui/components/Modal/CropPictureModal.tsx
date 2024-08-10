import CropPictureModalFooter from './CropPictureModalFooter';
import { RefObject, useEffect } from 'react';
import Cropper from '../Cropper/Cropper';
import './styles/CropPictureModal.scss';
import i18n from '../../../core/i18n';
import {
  useModalIsOpen,
  useModalStoreActions,
} from '../../../stores/ModalStore';
import Modal from './Modal';

interface CropPictureModalProps {
  pictureType: 'avatar' | 'articlePicture';
  modalRef: RefObject<HTMLDialogElement>;
  imgSrc: string;
}

const modalKey = 'cropPictureModal';

const CropPictureModal = ({
  pictureType,
  modalRef,
  imgSrc,
}: CropPictureModalProps) => {
  const { closeModal, setRef } = useModalStoreActions();
  const isOpen = useModalIsOpen(modalKey);

  useEffect(() => {
    setRef(modalKey, modalRef);
  }, [imgSrc]);

  const crop = () => {
    console.log('CROP');
  };

  //   if (!imgSrc) return;

  return (
    <Modal
      title={i18n.t('cropPictureModal.title')}
      closeModal={() => closeModal(modalKey)}
      modalRef={modalRef}
      isOpen={isOpen}
      height="85%"
      width="85%"
      footer={
        <CropPictureModalFooter
          toggleOpenModal={() => closeModal(modalKey)}
          crop={crop}
        />
      }
    >
      {imgSrc && <Cropper src={imgSrc} alt={pictureType} />}
      {/* TODO: add <Cropper /> component here */}
    </Modal>
  );
};

export default CropPictureModal;
