import { useDeleteBlogPost } from '@/api/backOffice/blog/deleteBlogPost';
import { QueryKeysEnum } from '@/enums/queryKeys';
import { useTranslation } from 'react-i18next';
import { queryClient } from '@/api/reactQuery';
import { Id, toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useState } from 'react';

interface UseDeletePostType {
  postId: string;
}

const useDeletePost = ({ postId }: UseDeletePostType) => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastId, setToastId] = useState<Id | null>(null);

  const handleCreatePostError = (error: AxiosError) => {
    let message;
    if (error.response && error.response.status === 400) {
      message = t('form.post.errors.postDeletionFailed');
    } else {
      message = t('common.genericError');
    }

    setErrorMessage(message);

    if (toastId) {
      toast.update(toastId, {
        render: message,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        pauseOnHover: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const { mutateAsync: deletePost } = useDeleteBlogPost({
    onMutate: () => {
      const id = toast.loading(t('common.deleting'));
      setToastId(id);
    },
    onSuccess: async () => {
      // update the posts list received from api after successful post is deleted
      await queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.POSTS] });

      if (toastId) {
        toast.update(toastId, {
          render: t('form.post.success.postDeletionSuccess'),
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
        });
      }
    },
    onError: handleCreatePostError,
    onSettled: () => {
      setToastId(null);
      toast.clearWaitingQueue();
    },
  });

  const deleteBlogPost = async () => {
    try {
      await deletePost(postId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { deleteBlogPost, errorMessage };
};

export default useDeletePost;
