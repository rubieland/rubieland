import { useCropPictureModalContext } from './providers/CropPictureModalProvider';
import CropPictureModalFooter from './CropPictureModalFooter';
import './styles/CropPictureModal.scss';
import i18n from '../../../core/i18n';
import Modal from './Modal';

const CropPictureModal = () => {
  const { toggleOpenModal } = useCropPictureModalContext();
  const crop = () => {
    console.log('CROP');
  };

  return (
    <>
      <Modal
        title={i18n.t('cropPictureModal.title')}
        toggleOpenModal={toggleOpenModal}
        height="100%"
        width="75%"
        footer={
          <CropPictureModalFooter
            toggleOpenModal={toggleOpenModal}
            crop={crop}
          />
        }
      >
        {/* TODO: add <Cropper /> component here */}
      </Modal>
    </>
  );
};

export default CropPictureModal;
