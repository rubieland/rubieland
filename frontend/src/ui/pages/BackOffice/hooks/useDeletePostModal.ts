import useDeletePost from './useDeletePost';
import { useState } from 'react';

type UseDeletePostModalType = {
  postId: string;
};

const useDeletePostModal = ({ postId }: UseDeletePostModalType) => {
  const { deleteBlogPost } = useDeletePost({ postId });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeletePost = () => {
    deleteBlogPost();
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleDeletePost,
  };
};

export default useDeletePostModal;
