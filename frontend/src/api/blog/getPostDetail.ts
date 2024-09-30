import { Post, convertPostDtoToEntity } from '../../models/posts/post.entity';
import { ExtractFnReturnType, QueryConfig } from '../reactQuery';
import { QueryKeysEnum } from '../../enums/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { api } from '../axios';

export const getPostDetail = async (postId: string): Promise<Post> => {
  const response = await api.get(`/blog/posts/${postId}`);
  const post = response.data.post;

  return convertPostDtoToEntity(post);
};

type QueryFnType = typeof getPostDetail;

type UseGetPostDetailOptions = {
  postId: string;
  config?: QueryConfig<QueryFnType>;
};

export const GET_POST_KEY = (id: string) => [
  QueryKeysEnum.POST_DETAIL,
  { postId: id },
];

export const useGetPostDetail = ({
  postId,
  config,
}: UseGetPostDetailOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: GET_POST_KEY(postId),
    queryFn: () => getPostDetail(postId),
  });
};
