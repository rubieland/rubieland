import { useMutation } from '@tanstack/react-query';
import { MutationConfig } from '../reactQuery';
import { api } from '../axios';

export const postLogout = async () => {
  const result = await api.post('/auth/logout', {}, { withCredentials: true });

  return result.data;
};

type UseLogoutBodyOptions = MutationConfig<typeof postLogout>;

export const usePostLogout = (config: UseLogoutBodyOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: () => postLogout(),
  });
};
