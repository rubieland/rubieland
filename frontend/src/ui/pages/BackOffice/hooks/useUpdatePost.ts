import { useUpdateBlogPost } from '@/api/backOffice/blog/updateBlogPost';
import { PostBody } from '@/models/posts/post.entity';
import { QueryKeysEnum } from '@/enums/queryKeys';
import { queryClient } from '@/api/reactQuery';
import { useTranslation } from 'react-i18next';
import { Id, toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useState } from 'react';

const useUpdatePost = () => {
  const { t } = useTranslation();
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.POSTS] });

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
    },
    onError: handleUpdatePostError,
    onSettled: () => {
      setToastId(null);
      toast.clearWaitingQueue();
    },
  });

  const onSubmit = async (data: PostBody, postId: string) => {
    try {
      const response = await updatePost({ newData: data, postId });

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return { onSubmit, isPending, errorMessage };
};

export default useUpdatePost;
