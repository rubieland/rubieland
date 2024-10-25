import { ExtractFnReturnType, QueryConfig } from '../../reactQuery';
import { QueryKeysEnum } from '../../../enums/queryKeys';
import {
  convertPostDtoToEntity,
  Post,
} from '../../../models/posts/post.entity';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../axios';

export const getAllPostsBackOffice = async (): Promise<Post[]> => {
  const response = await api.get(`/back-office/blog/posts/all`);
  const posts = response.data.posts;

  return posts.map(convertPostDtoToEntity);
};

type QueryFnType = typeof getAllPostsBackOffice;

type UseGetAllPostsBackOfficeOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetAllPostsBackOffice = ({
  config,
}: UseGetAllPostsBackOfficeOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QueryKeysEnum.POSTS],
    queryFn: getAllPostsBackOffice,
  });
};
