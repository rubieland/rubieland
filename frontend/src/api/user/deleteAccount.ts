import { useMutation } from '@tanstack/react-query';
import { MutationConfig } from '../reactQuery';
import { api } from '../axios';

const deleteAccount = async () => {
  const response = await api.delete(`profile/delete-account`);
  return response.data;
};

type UseDeleteAccountOptions = MutationConfig<typeof deleteAccount>;

export const useDeleteAccount = (config: UseDeleteAccountOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: deleteAccount,
  });
};
