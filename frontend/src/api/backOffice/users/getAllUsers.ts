import { convertUserDtoToEntity, User } from '../../../models/user/user.entity';
import { ExtractFnReturnType, QueryConfig } from '../../reactQuery';
import { QueryKeysEnum } from '../../../enums/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../axios';

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get(`/back-office/users/all`);
  const users = response.data.users;

  console.log(users);

  return users.map(convertUserDtoToEntity);
};

type QueryFnType = typeof getAllUsers;

type UseGetAllUsersOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetAllUsers = ({ config }: UseGetAllUsersOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QueryKeysEnum.USERS],
    queryFn: getAllUsers,
  });
};
