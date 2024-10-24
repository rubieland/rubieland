import { PostBody } from '@/models/posts/post.entity';
import { useMutation } from '@tanstack/react-query';
import { MutationConfig } from '@/api/reactQuery';
import { api } from '@/api/axios';

const postCreateBlogPost = async (data: PostBody) => {
  // convert data to FormData because we are sending a file
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('isPublished', data.isPublished.toString());
  formData.append('picture', data.picture as Blob);

  const response = await api.post('/back-office/blog/posts/create', formData, {
    // set the content type to multipart/form-data to handle file upload
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

type UsePostCreateBlogPostOptions = MutationConfig<typeof postCreateBlogPost>;

export const usePostCreateBlogPost = (
  config: UsePostCreateBlogPostOptions = {},
) => {
  return useMutation({
    ...config,
    mutationFn: (data: PostBody) => postCreateBlogPost(data),
  });
};
