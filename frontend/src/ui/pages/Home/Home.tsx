import { useCropPictureModalContext } from '../../components/Modal/providers/CropPictureModalProvider';
import CropPictureModal from '../../components/Modal/CropPictureModal';
import CustomButton from '../../components/Button/CustomButton';
import FormTests from '../../components/FormTests/FormTests';

const Home = () => {
  const { toggleOpenModal, isModalOpen } = useCropPictureModalContext();

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <CustomButton
          width={20}
          title="Ouvrir la modale"
          onClick={toggleOpenModal}
        />
      </div>
      {/* TODO: remove <FormTests /> when first form is ready  */}
      <FormTests />
      {isModalOpen && <CropPictureModal />}
    </>
  );
};

export default Home;
