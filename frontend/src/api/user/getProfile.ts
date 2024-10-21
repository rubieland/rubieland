import { useSessionStoreActions } from '../../stores/SessionStore';
import { ExtractFnReturnType, QueryConfig } from '../reactQuery';
import { QueryKeysEnum } from '@/enums/queryKeys';
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
  const response = await api.get(`/profile`, {
    withCredentials: true,
  });

  const newUser = convertUserDtoToEntity(response.data.user);
  setUser({ user: newUser });

  return newUser;
};

type QueryFnType = typeof getProfile;

type UseGetProfileOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetProfile = ({ config }: UseGetProfileOptions = {}) => {
  const { setUser } = useSessionStoreActions();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QueryKeysEnum.MY_PROFILE],
    queryFn: () => getProfile(setUser),
  });
};
