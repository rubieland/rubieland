import { useDeleteBlogPost } from '@/api/backOffice/blog/deleteBlogPost';
import { QueryKeysEnum } from '@/enums/queryKeys';
import { useTranslation } from 'react-i18next';
import { queryClient } from '@/api/reactQuery';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface UseDeletePostType {
  postId: string;
}

const useDeletePost = ({ postId }: UseDeletePostType) => {
  const { t } = useTranslation();

  const handleCreatePostError = (error: unknown) => {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 400:
          return toast.error(t('form.post.errors.postDeletionFailed'));
        case 404:
          return toast.error(t('form.post.errors.postNotFound'));
        case 500:
          return toast.error(t('common.serverError'));
        default:
          return toast.error(t('common.genericError'));
      }
    }
    console.error('Unexpected error:', error);
    return toast.error(t('common.genericError'));
  };

  const { mutateAsync: deletePost, isPending } = useDeleteBlogPost({
    onSuccess: async () => {
      // update the posts list received from api after successful post is deleted
      await queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.POSTS] });

      toast.success(t('form.post.success.postDeletionSuccess'));
    },
    onError: handleCreatePostError,
  });

  const deleteBlogPost = async () => {
    const loadingToastId = toast.loading(
      t('form.post.loading.postDeletionLoading'),
    );
    try {
      const response = await deletePost(postId);

      toast.dismiss(loadingToastId);
      return response;
    } catch (error) {
      toast.dismiss(loadingToastId);
      throw error;
    }
  };

  return { deleteBlogPost, isPending };
};

export default useDeletePost;
