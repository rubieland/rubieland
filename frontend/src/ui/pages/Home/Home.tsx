import CustomButton from '../../components/Button/CustomButton';
import FormTests from '../../components/FormTests/FormTests';
import CropPictureModal from '../../components/Modal/CropPictureModal';
import { useCropPictureModalContext } from '../../components/Modal/providers/CropPictureModalProvider';

const Home = () => {
  const { toggleOpenModal, isModalOpen } = useCropPictureModalContext();
  return (
    <>
      <CustomButton title="Ouvrir la modale" onClick={toggleOpenModal} />
      {/* TODO: remove <FormTests /> when first form is ready  */}
      <FormTests />
      {isModalOpen && <CropPictureModal />}
    </>
  );
};

export default Home;
