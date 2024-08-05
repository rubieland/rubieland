import { useCropPictureModalContext } from './providers/CropPictureModalProvider';
import colors from '../../../assets/styles/colors';
import CustomButton from '../Button/CustomButton';
import i18n from '../../../core/i18n';
import Cross from '../Icons/Cross';
import './CropPictureModal.scss';

const CropPictureModal = () => {
  const { toggleOpenModal } = useCropPictureModalContext();
  const crop = () => {
    console.log('CROP');
  };

  return (
    <div className="modal-overlay" onClick={toggleOpenModal}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{i18n.t('cropPictureModal.title')}</h3>
          <div className="modal-close-icon" onClick={toggleOpenModal}>
            <Cross color={colors.white} height={36} width={36} />
          </div>
        </div>
        <div className="modal-content">
          <p>CropPictureModal</p>
        </div>
        <div className="modal-footer">
          <CustomButton
            title={i18n.t('common.cancel')}
            onClick={toggleOpenModal}
            style="error"
            outlined
          />
          <CustomButton
            title={i18n.t('cropPictureModal.cropButtonTitle')}
            style="primary"
            onClick={crop}
          />
        </div>
      </div>
    </div>
  );
};

export default CropPictureModal;
