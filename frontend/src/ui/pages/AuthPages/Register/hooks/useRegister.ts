import { usePostRegister } from '../../../../../api/auth/postRegister';
import { RegisterBody } from '../../../../../models/user/user.entity';
import { useNavigate } from '@tanstack/react-router';
import { QueryKeysEnum } from '@/enums/queryKeys';
import { useTranslation } from 'react-i18next';
import { queryClient } from '@/api/reactQuery';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useRegister = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRegisterError = (error: unknown) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        return toast.error(t('auth.error.accountAlreadyExists'));
      }
      return toast.error(t('auth.error.registerFailed'));
    }

    console.error('Unexpected error:', error);
    return toast.error(t('common.genericError'));
  };

  const { mutateAsync: registerUser, isPending } = usePostRegister({
    onSuccess: async () => {
      // update the users list received from api after successful register
      await queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.USERS] });

      // redirect to login page after successful register
      navigate({ from: '/register', to: '/login' });
    },
    onError: handleRegisterError,
  });

  const onSubmit = async (data: RegisterBody) => {
    const loadingToastId = toast.loading(t('auth.loading.registerLoading'));

    try {
      const registerResponse = await registerUser(data);

      toast.dismiss(loadingToastId);
      return registerResponse;
    } catch (error) {
      toast.dismiss(loadingToastId);
      throw error;
    }
  };

  return { onSubmit, isPending };
};

export default useRegister;
