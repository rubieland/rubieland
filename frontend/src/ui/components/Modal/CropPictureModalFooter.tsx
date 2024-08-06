import CustomButton from '../Button/CustomButton';
import i18n from '../../../core/i18n';

interface CropPictureModalFooterProps {
  toggleOpenModal: () => void;
  crop: () => void;
}

const CropPictureModalFooter = ({
  toggleOpenModal,
  crop,
}: CropPictureModalFooterProps) => {
  return (
    <>
      <CustomButton
        title={i18n.t('common.cancel')}
        onClick={toggleOpenModal}
        style="error"
        outlined
      />
      <CustomButton title={'Confirmer'} style="primary" onClick={crop} />
    </>
  );
};

export default CropPictureModalFooter;
