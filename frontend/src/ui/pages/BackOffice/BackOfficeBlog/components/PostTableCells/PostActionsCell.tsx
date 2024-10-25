import useDeletePostModal from '@/ui/pages/BackOffice/hooks/useDeletePostModal';
import DeletePostModal from '@/ui/components/Modal/DeletePostModal';
import CustomButton from '@/ui/components/Button/CustomButton';
import PenSquare from '@/ui/components/Icons/PenSquare';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import Bin from '@/ui/components/Icons/Bin';
import colors from '@/assets/styles/colors';
import './styles/PostActionsCell.scss';
import { useRef } from 'react';

interface PostActionsCellProps {
  postId: string;
}

const PostActionsCell = ({ postId }: PostActionsCellProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common',
  });

  const navigate = useNavigate();

  const handleNavigateToEditPost = () => {
    navigate({
      to: `/back-office/blog/update-post/${postId}`,
    });
  };

  const modalRef = useRef<HTMLDialogElement>(null);
  const { isModalOpen, handleOpenModal, handleCloseModal, handleDeletePost } =
    useDeletePostModal({ postId });

  return (
    <div className="post-actions-cell">
      <CustomButton
        icon={<PenSquare width={24} height={24} stroke={colors.white} />}
        onClick={handleNavigateToEditPost}
        iconPosition="right"
        title={t('edit')}
        style="primary"
      />
      <CustomButton
        icon={<Bin width={24} height={24} stroke={colors.white} />}
        onClick={handleOpenModal}
        iconPosition="right"
        title={t('delete')}
        style="error"
        outlined
      />
      <DeletePostModal
        onDelete={handleDeletePost}
        onClose={handleCloseModal}
        isOpen={isModalOpen}
        modalRef={modalRef}
      />
    </div>
  );
};

export default PostActionsCell;
