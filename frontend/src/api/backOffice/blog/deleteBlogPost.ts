import { api } from '@/api/axios';
import { MutationConfig } from '@/api/reactQuery';
import { useMutation } from '@tanstack/react-query';

const deleteBlogPost = async (id: string) => {
  const response = await api.delete(`/back-office/blog/posts/${id}/delete`);
  return response.data;
};

type UseDeleteBlogPostOptions = MutationConfig<typeof deleteBlogPost>;

export const useDeleteBlogPost = (config: UseDeleteBlogPostOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: (id: string) => deleteBlogPost(id),
  });
};
