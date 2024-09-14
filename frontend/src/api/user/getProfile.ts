import { useSessionStoreActions } from '../../stores/SessionStore';
import { ExtractFnReturnType, QueryConfig } from '../reactQuery';
import { useQuery } from '@tanstack/react-query';
import {
  convertUserDtoToEntity,
  SessionData,
  User,
} from '../../models/user/user.entity';
import { api } from '../axios';

export const getProfile = async (
  setUser: (user: Pick<SessionData, 'user'>) => void,
): Promise<User> => {
  const response = await api.get(`/profile`);
  const newUser = convertUserDtoToEntity(response.data);

  setUser({ user: newUser });

  return newUser;
};

type QueryFnType = typeof getProfile;

type UseGetUserOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetProfile = ({ config }: UseGetUserOptions = {}) => {
  const { setUser } = useSessionStoreActions();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['user'],
    queryFn: () => getProfile(setUser),
  });
};
