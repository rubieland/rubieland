import { convertPostDtoToEntity, Post } from '@/models/posts/post.entity';
import { ExtractFnReturnType, QueryConfig } from '@/api/reactQuery';
import { QueryKeysEnum } from '@/enums/queryKeys';
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
    queryKey: [QueryKeysEnum.POST_DETAILS],
    queryFn: () => getPostDetailsBackOffice(postId),
  });
};

export default getPostDetailsBackOffice;
