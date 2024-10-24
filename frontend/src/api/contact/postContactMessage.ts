import { useMutation } from '@tanstack/react-query';
import { MutationConfig } from '../reactQuery';
import { api } from '../axios';

export interface ContactMessageBody {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const postContactMessage = async (data: ContactMessageBody) => {
  const response = await api.post('/contact', data);
  return response.data;
};

type UsePostContactMessageOptions = MutationConfig<typeof postContactMessage>;

export const usePostContactMessage = (
  config: UsePostContactMessageOptions = {},
) => {
  return useMutation({
    ...config,
    mutationFn: (data: ContactMessageBody) => postContactMessage(data),
  });
};
