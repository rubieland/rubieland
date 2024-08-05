import { useCropPictureModalContext } from './providers/CropPictureModalProvider';
import CustomButton from '../Button/CustomButton';
import './CropPictureModal.scss';
import Cross from '../Icons/Cross';
import i18n from '../../../core/i18n';

const CropPictureModal = () => {
  const { closeModal } = useCropPictureModalContext();
  const crop = () => {
    console.log('CROP');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h3>{i18n.t('cropPictureModal.title')}</h3>
          <div className="modal-close-icon" onClick={closeModal}>
            <Cross height={36} width={36} />
          </div>
        </div>
        <div className="modal-content">
          <p>CropPictureModal</p>
        </div>
        <div className="modal-footer">
          <CustomButton
            title={i18n.t('common.cancel')}
            style="error"
            onClick={closeModal}
            width={20}
          />
          <CustomButton
            title={i18n.t('cropPictureModal.cropButtonTitle')}
            style="primary"
            onClick={crop}
            width={20}
          />
        </div>
      </div>
    </div>
  );
};

export default CropPictureModal;
