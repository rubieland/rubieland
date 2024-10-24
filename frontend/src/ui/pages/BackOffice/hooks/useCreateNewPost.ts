import { usePostCreateBlogPost } from '@/api/backOffice/blog/postCreateBlogPost';
import { PostBody } from '@/models/posts/post.entity';
import { QueryKeysEnum } from '@/enums/queryKeys';
import { queryClient } from '@/api/reactQuery';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import DOMPurify from 'dompurify';
import { toast } from 'sonner';

const useCreateNewPost = () => {
  const { t } = useTranslation();

  const handleCreatePostError = (error: unknown) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return toast.error(t('form.post.errors.postCreationFailed'));
      } else if (error.response?.status === 500) {
        return toast.error(t('common.serverError'));
      }
      return toast.error(t('common.genericError'));
    }
    console.error('Unexpected error:', error);
    return toast.error(t('common.genericError'));
  };

  const { mutateAsync: createPost, isPending } = usePostCreateBlogPost({
    onSuccess: async () => {
      // update the posts list received from api after successful post creation
      await queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.POSTS] });
      toast.success(t('form.post.success.postCreationSuccess'));
    },
    onError: handleCreatePostError,
  });

  const onSubmit = async (data: PostBody) => {
    const loadingToastId = toast.loading(
      t('form.post.loading.postCreationLoading'),
    );
    const sanitizedContent = DOMPurify.sanitize(data.content);
    const postBody = { ...data, content: sanitizedContent };

    try {
      const response = await createPost(postBody);

      toast.dismiss(loadingToastId);
      return response;
    } catch (error) {
      toast.dismiss(loadingToastId);
      throw error;
    }
  };

  return { onSubmit, isPending };
};

export default useCreateNewPost;
