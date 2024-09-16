import CropPictureModal from '../../components/Modal/CropPictureModal';
import { useModalStoreActions } from '../../../stores/ModalStore';
import CustomButton from '../../components/Button/CustomButton';
import FormTests from '../../components/FormTests/FormTests';
import { useRef } from 'react';
import { useIsConnected } from '../../../stores/SessionStore';
import useLogout from '../../../hooks/useLogout';

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
            title="Déconnexion"
            onClick={() => logout(undefined)}
            width={20}
            style="error"
          />
        )}
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
