import { convertPostDtoToEntity, Post } from '@/models/posts/post.entity';
import { ExtractFnReturnType, QueryConfig } from '@/api/reactQuery';
import { GET_POST_KEY } from '@/enums/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/axios';

const getPostDetailsBackOffice = async (id: string): Promise<Post> => {
  const response = await api.get(`/back-office/blog/posts/${id}`);

  return convertPostDtoToEntity(response.data.post);
};

type QueryFnType = typeof getPostDetailsBackOffice;

type UseGetPostDetailsBackOfficeOptions = {
  postId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useGetPostDetailsBackOffice = ({
  postId,
  config,
}: UseGetPostDetailsBackOfficeOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: GET_POST_KEY(postId),
    queryFn: () => getPostDetailsBackOffice(postId),
  });
};

export default getPostDetailsBackOffice;
