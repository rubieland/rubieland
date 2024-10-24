import {
  ApiPostResponse,
  convertPostDtoToEntity,
  PostBody,
} from '@/models/posts/post.entity';
import { useUpdateBlogPost } from '@/api/backOffice/blog/updateBlogPost';
import { GET_POST_KEY, QueryKeysEnum } from '@/enums/queryKeys';
import { useNavigate } from '@tanstack/react-router';
import { AxiosError, AxiosResponse } from 'axios';
import { PostDto } from '@/models/posts/post.dto';
import { queryClient } from '@/api/reactQuery';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

type UseUpdatePostType = {
  postId: string;
};

const useUpdatePost = ({ postId }: UseUpdatePostType) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleUpdatePostError = (error: unknown) => {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 400:
          return toast.error(t('form.post.errors.postUpdateFailed'));
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

  const { mutateAsync: updatePost, isPending } = useUpdateBlogPost({
    onSuccess: async (data: AxiosResponse<ApiPostResponse>, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.POSTS],
      });
      await queryClient.invalidateQueries({
        queryKey: [GET_POST_KEY(variables.postId)],
      });

      await queryClient.setQueryData(
        GET_POST_KEY(variables.postId),
        convertPostDtoToEntity(data.data.post),
      );

      toast.success(t('form.post.success.postUpdateSuccess'));

      navigate({ to: '/back-office/blog' });
    },
    onError: handleUpdatePostError,
  });

  const onSubmit = async (data: PostBody): Promise<PostDto | undefined> => {
    const loadingToastId = toast.loading(
      t('form.post.loading.postUpdateLoading'),
    );
    try {
      const response: AxiosResponse<ApiPostResponse> = await updatePost({
        newData: data,
        postId,
      });

      toast.dismiss(loadingToastId);
      return response.data.post;
    } catch (error) {
      toast.dismiss(loadingToastId);
      throw error;
    }
  };

  return { onSubmit, isPending };
};

export default useUpdatePost;
