import { MutationConfig, queryClient } from '@/api/reactQuery';
import { PostBody } from '@/models/posts/post.entity';
import { useMutation } from '@tanstack/react-query';
import { GET_POST_KEY } from '@/enums/queryKeys';
import { api } from '@/api/axios';

type UpdateBlogPostType = {
  newData: PostBody;
  postId: string;
};

const updateBlogPost = async ({ newData, postId }: UpdateBlogPostType) => {
  const formData = new FormData();
  formData.append('title', newData.title);
  formData.append('content', newData.content);
  formData.append('isPublished', newData.isPublished.toString());
  formData.append('picture', newData.picture as Blob);

  const response = await api.put(
    `/back-office/blog/posts/${postId}/update`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response;
};

type UseUpdateBlogPostOptions = {
  postId: string;
  config?: MutationConfig<typeof updateBlogPost>;
};

export const useUpdateBlogPost = ({
  config,
  postId,
}: UseUpdateBlogPostOptions) => {
  return useMutation({
    ...config,
    mutationFn: ({ newData, postId }: UpdateBlogPostType) =>
      updateBlogPost({ newData, postId }),
    onSuccess: async (newData) => {
      await queryClient.setQueryData(GET_POST_KEY(postId), newData);
    },
  });
};
