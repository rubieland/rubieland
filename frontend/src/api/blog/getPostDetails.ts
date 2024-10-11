import {
  ApiPostResponse,
  Post,
  convertPostDtoToEntity,
} from '../../models/posts/post.entity';
import { ExtractFnReturnType, QueryConfig } from '../reactQuery';
import { GET_POST_KEY } from '../../enums/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { api } from '../axios';

export const getPostDetails = async (postId: string): Promise<Post> => {
  const response: AxiosResponse<ApiPostResponse> = await api.get(
    `/blog/posts/${postId}`,
  );
  const { post } = response.data;

  return convertPostDtoToEntity(post);
};

type QueryFnType = typeof getPostDetails;

type UseGetPostDetailsOptions = {
  postId: string;
  config?: QueryConfig<QueryFnType>;
};

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
