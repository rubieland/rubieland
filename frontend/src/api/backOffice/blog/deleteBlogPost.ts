import { MutationConfig, queryClient } from '@/api/reactQuery';
import { useMutation } from '@tanstack/react-query';
import { QueryKeysEnum } from '@/enums/queryKeys';
import { api } from '@/api/axios';

const deleteBlogPost = async (id: string) => {
  const response = await api.delete(`/back-office/blog/posts/${id}/delete`);
  return response.data;
};

type UseDeleteBlogPostOptions = MutationConfig<typeof deleteBlogPost>;

export const useDeleteBlogPost = (config: UseDeleteBlogPostOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: (id: string) => deleteBlogPost(id),
    // update the posts list received from api after successful post is deleted
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.POSTS] }),
  });
};
