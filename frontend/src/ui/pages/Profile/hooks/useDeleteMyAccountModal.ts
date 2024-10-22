import useDeleteMyAccount from './useDeleteMyAccount';
import { useState } from 'react';

const useDeleteMyAccountModal = () => {
  const { handleDeleteMyAccount, isPending } = useDeleteMyAccount();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteMyAccountAndCloseModal = () => {
    handleDeleteMyAccount();
    setIsModalOpen(false);
  };

  return {
    handleDeleteMyAccountAndCloseModal,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    isPending,
  };
};

export default useDeleteMyAccountModal;
