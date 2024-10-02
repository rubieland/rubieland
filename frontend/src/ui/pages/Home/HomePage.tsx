import CropPictureModal from '../../components/Modal/CropPictureModal';
import ChevronLeft from '../../components/Icons/Arrows/ChevronLeft';
import { useModalStoreActions } from '../../../stores/ModalStore';
import ArrowLeft from '../../components/Icons/Arrows/ArrowLeft';
import CustomButton from '../../components/Button/CustomButton';
import { useIsConnected } from '../../../stores/SessionStore';
import FormTests from '../../components/FormTests/FormTests';
import useLogout from '../../../hooks/useLogout';
import { useRef } from 'react';

const Home = () => {
  const cropPictureModalRef = useRef<HTMLDialogElement>(null);
  const { openModal } = useModalStoreActions();
  const isConnected = useIsConnected();
  const { logout } = useLogout();

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {isConnected && (
          <CustomButton
            icon={<ArrowLeft />}
            iconStyle="fill"
            title="Déconnexion"
            onClick={() => logout(undefined)}
            width={20}
            style="error"
          />
        )}
        <CustomButton
          title="Ouvrir Crop Picture Modal"
          onClick={() => openModal('cropPictureModal')}
          icon={<ChevronLeft />}
          iconPosition="right"
          width={20}
        />
      </div>
      <CropPictureModal modalRef={cropPictureModalRef} />
      <FormTests />
    </>
  );
};

export default Home;
