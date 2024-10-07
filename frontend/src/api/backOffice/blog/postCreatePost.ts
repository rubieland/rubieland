import { MutationConfig, queryClient } from '@/api/reactQuery';
import { PostBody } from '@/models/posts/post.entity';
import { useMutation } from '@tanstack/react-query';
import { QueryKeysEnum } from '@/enums/queryKeys';
import { api } from '@/api/axios';

const postCreatePost = async (postBody: PostBody) => {
  const response = await api.post('/back-office/blog/posts/create', postBody);

  return response;
};

type UserPostCreatePostOptions = MutationConfig<typeof postCreatePost>;

export const usePostCreatePost = (config: UserPostCreatePostOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: (data: PostBody) => postCreatePost(data),
    onSuccess: async () => {
      // update the posts list received from api after successful post creation
      await queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.POSTS] });
    },
  });
};
