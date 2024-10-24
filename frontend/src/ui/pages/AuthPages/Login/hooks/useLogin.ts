import { useSessionStoreActions } from '../../../../../stores/SessionStore';
import { LoginBody } from '../../../../../models/user/user.entity';
import { usePostLogin } from '../../../../../api/auth/postLogin';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useLogin = () => {
  const { t } = useTranslation();
  const { setSession } = useSessionStoreActions();
  const navigate = useNavigate({ from: '/login' });

  const handleLoginError = (error: unknown) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return toast.error(t('auth.error.invalidCredentials'));
      }
      return toast.error(t('auth.error.loginFailed'));
    }

    console.error('Unexpected error:', error);
    return toast.error(t('common.genericError'));
  };

  const { mutateAsync: login, isPending } = usePostLogin({
    onSuccess: () => {
      toast.success(t('auth.success.loginSuccess'));
      navigate({ from: '/login', to: '/' });
    },
    onError: handleLoginError,
  });

  const onSubmit = async (data: LoginBody) => {
    const loadingToastId = toast.loading(t('auth.loading.loginLoading'));

    try {
      const loginResponse = await login(data);
      const { accessToken, user } = loginResponse.data;

      setSession({ accessToken, user });

      toast.dismiss(loadingToastId);
      return loginResponse;
    } catch (error) {
      toast.dismiss(loadingToastId);
      throw error;
    }
  };

  return { onSubmit, isPending };
};

export default useLogin;
