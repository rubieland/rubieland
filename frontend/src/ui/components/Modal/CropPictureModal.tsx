import { useCropPictureModalContext } from './providers/CropPictureModalProvider';
import CustomButton from '../Button/CustomButton';
import './CropPictureModal.scss';

const CropPictureModal = () => {
  const { closeModal } = useCropPictureModalContext();
  const crop = () => {
    console.log('CROP');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h3>Redimensionner l'image</h3>
          <CustomButton title="Fermer" onClick={closeModal} width={20} />
        </div>
        <div className="modal-content">
          <p>CropPictureModal</p>
        </div>
        <div className="modal-footer">
          <CustomButton
            title="Annuler"
            style="error"
            onClick={closeModal}
            width={20}
          />
          <CustomButton
            title="Redimensionner"
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
