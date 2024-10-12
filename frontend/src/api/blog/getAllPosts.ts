import { Post, convertPostDtoToEntity } from '../../models/posts/post.entity';
import { ExtractFnReturnType, QueryConfig } from '../reactQuery';
import { QueryKeysEnum } from '../../enums/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { api } from '../axios';

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await api.get(`/blog/posts/all`);
  const posts = response.data.posts;

  return posts.map(convertPostDtoToEntity);
};

type QueryFnType = typeof getAllPosts;

type UseGetAllPostsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetAllPosts = ({ config }: UseGetAllPostsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QueryKeysEnum.POSTS],
    queryFn: () => getAllPosts(),
  });
};
