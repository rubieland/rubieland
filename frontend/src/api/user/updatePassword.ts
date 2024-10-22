import { UpdatePasswordBody } from '@/models/user/user.entity';
import { useMutation } from '@tanstack/react-query';
import { MutationConfig } from '../reactQuery';
import { api } from '../axios';

type UpdatePasswordType = {
  newData: UpdatePasswordBody;
};

const updatePassword = async ({ newData }: UpdatePasswordType) => {
  const response = await api.put(`/profile/update-password`, newData);

  return response;
};

type UseUpdatePasswordOptions = MutationConfig<typeof updatePassword>;

export const useUpdatePassword = (config: UseUpdatePasswordOptions) => {
  return useMutation({
    ...config,
    mutationFn: ({ newData }: UpdatePasswordType) =>
      updatePassword({ newData }),
  });
};
