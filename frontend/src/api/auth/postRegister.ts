import { RegisterBody } from '../../models/user/user.entity';
import { useMutation } from '@tanstack/react-query';
import { MutationConfig } from '../reactQuery';
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
  });
};
