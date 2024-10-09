import { usePostCreateBlogPost } from '@/api/backOffice/blog/postCreateBlogPost';
import { PostBody } from '@/models/posts/post.entity';
import { QueryKeysEnum } from '@/enums/queryKeys';
import { queryClient } from '@/api/reactQuery';
import { useTranslation } from 'react-i18next';
import { Id, toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useState } from 'react';

const useCreateNewPost = () => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastId, setToastId] = useState<Id | null>(null);

  const handleCreatePostError = (error: AxiosError) => {
    let message;
    if (error.response && error.response.status === 400) {
      message = t('form.post.errors.postCreationFailed');
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

  const { mutateAsync: createPost, isPending } = usePostCreateBlogPost({
    onMutate: () => {
      const id = toast.loading(t('common.formSending'));
      setToastId(id);
    },
    onSuccess: async () => {
      // update the posts list received from api after successful post creation
      await queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.POSTS] });

      if (toastId) {
        toast.update(toastId, {
          render: t('form.post.success.postCreationSuccess'),
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

  const onSubmit = async (data: PostBody) => {
    createPost(data);
  };

  return { onSubmit, errorMessage, isPending };
};

export default useCreateNewPost;
