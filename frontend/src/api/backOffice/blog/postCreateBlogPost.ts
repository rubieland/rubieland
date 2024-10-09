import { PostBody } from '@/models/posts/post.entity';
import { useMutation } from '@tanstack/react-query';
import { MutationConfig } from '@/api/reactQuery';
import { api } from '@/api/axios';

const postCreateBlogPost = async (postBody: PostBody) => {
  const response = await api.post('/back-office/blog/posts/create', postBody);

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
