import CropPictureModal from '../../components/Modal/CropPictureModal';
import { useModalStoreActions } from '../../../stores/ModalStore';
import CustomButton from '../../components/Button/CustomButton';
import FormTests from '../../components/FormTests/FormTests';
import { useRef } from 'react';
import {
  useIsConnected,
  useSessionStoreActions,
} from '../../../stores/SessionStore';

const Home = () => {
  const cropPictureModalRef = useRef<HTMLDialogElement>(null);
  const { openModal } = useModalStoreActions();
  const isConnected = useIsConnected();
  const { logout } = useSessionStoreActions();

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
            onClick={logout}
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
