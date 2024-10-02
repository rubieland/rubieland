import { Post, convertPostDtoToEntity } from '../../models/posts/post.entity';
import { ExtractFnReturnType, QueryConfig } from '../reactQuery';
import { QueryKeysEnum } from '../../enums/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { api } from '../axios';

export const getPostDetails = async (postId: string): Promise<Post> => {
  const response = await api.get(`/blog/posts/${postId}`);
  const post = response.data.post;

  return convertPostDtoToEntity(post);
};

type QueryFnType = typeof getPostDetails;

type UseGetPostDetailsOptions = {
  postId: string;
  config?: QueryConfig<QueryFnType>;
};

export const GET_POST_KEY = (id: string) => [
  QueryKeysEnum.POST_DETAILS,
  { postId: id },
];

export const useGetPostDetails = ({
  postId,
  config,
}: UseGetPostDetailsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: GET_POST_KEY(postId),
    queryFn: () => getPostDetails(postId),
  });
};
