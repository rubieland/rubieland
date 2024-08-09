import CropPictureModal from '../../components/Modal/CropPictureModal';
import { useModalStoreActions } from '../../../stores/ModalStore';
import CustomButton from '../../components/Button/CustomButton';
import FormTests from '../../components/FormTests/FormTests';
import { useRef } from 'react';

const Home = () => {
  const cropPictureModalRef = useRef<HTMLDialogElement>(null);
  const { openModal } = useModalStoreActions();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CustomButton
          title="Ouvrir Crop Picture Modal"
          onClick={() => openModal('cropPictureModal')}
          width={20}
        />
      </div>
      <CropPictureModal modalRef={cropPictureModalRef} />
      <FormTests />
    </>
  );
};

export default Home;
