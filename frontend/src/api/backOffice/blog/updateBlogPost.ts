import { PostBody } from '@/models/posts/post.entity';
import { useMutation } from '@tanstack/react-query';
import { MutationConfig } from '@/api/reactQuery';
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
  if (typeof newData.picture === 'string') {
    formData.append('picture', newData.picture);
  } else {
    formData.append('picture', newData.picture as Blob);
  }

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

type UseUpdateBlogPostOptions = MutationConfig<typeof updateBlogPost>;

export const useUpdateBlogPost = (config: UseUpdateBlogPostOptions) => {
  return useMutation({
    ...config,
    mutationFn: ({ newData, postId }: UpdateBlogPostType) =>
      updateBlogPost({ newData, postId }),
  });
};
