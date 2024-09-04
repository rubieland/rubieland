import { LoginBody } from '../../models/user/user.entity';
import { useMutation } from '@tanstack/react-query';
import { MutationConfig } from '../reactQuery';
import { api } from '../axios';

const postLogin = async (body: LoginBody) => {
  const response = await api.post('/auth/login', body);

  return response;
};

type UseLoginBodyOptions = MutationConfig<typeof postLogin>;

export const usePostLogin = (config: UseLoginBodyOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: (data: LoginBody) => postLogin(data),
  });
};
