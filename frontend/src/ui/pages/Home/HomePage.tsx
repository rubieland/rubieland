import ArrowLeft from '../../components/Icons/Arrows/ArrowLeft';
import CustomButton from '../../components/Button/CustomButton';
import { useIsConnected } from '../../../stores/SessionStore';
import useLogout from '../../../hooks/useLogout';
import Modal from '@/ui/components/Modal/Modal';
import { useRef, useState } from 'react';

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const isConnected = useIsConnected();
  const { logout } = useLogout();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const mondalConfirmAction = () => {
    console.log('Modal confirm action');
    setOpenModal(false);
  };

  const modalCancelAction = () => {
    console.log('Modal cancel action');
    setOpenModal(false);
  };

  return (
    <div>
      <CustomButton
        onClick={handleOpenModal}
        title="Open modal"
        iconStyle="fill"
        style="secondary"
        width={20}
      />

      {isConnected && (
        <CustomButton
          onClick={() => logout(undefined)}
          icon={<ArrowLeft />}
          title="Déconnexion"
          iconStyle="fill"
          style="error"
          width={20}
        />
      )}
      <Modal
        closeModal={() => setOpenModal(false)}
        confirmAction={mondalConfirmAction}
        cancelAction={modalCancelAction}
        modalRef={modalRef}
        isOpen={openModal}
        title="Modal title"
        // hasCancelButton
      >
        <p>Modal content</p>
      </Modal>
    </div>
  );
};

export default Home;
