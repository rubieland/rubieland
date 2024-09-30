import { useSessionStoreActions } from '../../../../../stores/SessionStore';
import { LoginBody } from '../../../../../models/user/user.entity';
import { usePostLogin } from '../../../../../api/auth/postLogin';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Id, toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useState } from 'react';

const useLogin = () => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastId, setToastId] = useState<Id | null>(null);
  const { setSession } = useSessionStoreActions();
  const navigate = useNavigate({ from: '/login' });

  const handleLoginError = (error: AxiosError) => {
    let message;
    if (error.response && error.response.status === 400) {
      message = t('auth.error.invalidCredentials');
    } else {
      message = t('auth.error.loginFailed');
    }

    setErrorMessage(message);

    if (toastId) {
      toast.update(toastId, {
        render: message,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        pauseOnHover: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const { mutateAsync: login, isPending } = usePostLogin({
    onMutate: () => {
      const id = toast.loading(t('common.formSending'));
      setToastId(id);
    },
    onSuccess: () => {
      if (toastId) {
        toast.update(toastId, {
          render: t('auth.success.loginSuccess'),
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
        });
      }
      navigate({ to: '/' });
    },
    onError: handleLoginError,
    onSettled: () => {
      setToastId(null);
      toast.clearWaitingQueue();
    },
  });

  const onSubmit = async (data: LoginBody) => {
    try {
      const loginResponse = await login(data);
      const { accessToken, user } = loginResponse.data;

      setSession({ accessToken, user });

      return loginResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { onSubmit, errorMessage, isPending };
};

export default useLogin;
