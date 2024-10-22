import useLogout from '@/hooks/useLogout';
import { useState } from 'react';

const useLogoutModal = () => {
  const { handleLogout, isPending } = useLogout();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogoutAndCloseModal = () => {
    handleLogout();
    setIsModalOpen(false);
  };

  return {
    handleLogoutAndCloseModal,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    isPending,
  };
};

export default useLogoutModal;
