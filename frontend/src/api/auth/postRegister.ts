import { RegisterBody } from '../../models/user/user.entity';
import { MutationConfig, queryClient } from '../reactQuery';
import { useMutation } from '@tanstack/react-query';
import { QueryKeysEnum } from '@/enums/queryKeys';
import { api } from '../axios';

const postRegister = async (body: RegisterBody) => {
  const response = await api.post('/auth/register', body);

  return response;
};

type UseRegisterBodyOptions = MutationConfig<typeof postRegister>;

export const usePostRegister = (config: UseRegisterBodyOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: (data: RegisterBody) => postRegister(data),
    // update the users list received from api after successful register
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.USERS] });
    },
  });
};
