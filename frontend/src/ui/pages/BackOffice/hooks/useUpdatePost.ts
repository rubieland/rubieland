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
import { Id, toast } from 'react-toastify';
import { useState } from 'react';

type UseUpdatePostType = {
  postId: string;
};

const useUpdatePost = ({ postId }: UseUpdatePostType) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastId, setToastId] = useState<Id | null>(null);

  const handleUpdatePostError = (error: AxiosError) => {
    let message;
    if (error.response && error.response.status === 400) {
      message = t('form.post.errors.postUpdateFailed');
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

  const { mutateAsync: updatePost, isPending } = useUpdateBlogPost({
    onMutate: () => {
      const id = toast.loading(t('common.updating'));
      setToastId(id);
    },
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

      if (toastId) {
        toast.update(toastId, {
          render: t('form.post.success.postUpdateSuccess'),
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
        });
      }

      navigate({ to: '/back-office/blog' });
    },
    onError: handleUpdatePostError,
    onSettled: () => {
      setToastId(null);
      toast.clearWaitingQueue();
    },
  });

  const onSubmit = async (data: PostBody): Promise<PostDto | undefined> => {
    try {
      const response: AxiosResponse<ApiPostResponse> = await updatePost({
        newData: data,
        postId,
      });

      return response.data.post;
    } catch (error) {
      console.error(error);
    }
  };

  return { onSubmit, isPending, errorMessage };
};

export default useUpdatePost;
