import { LoginBody } from '../../../../../models/user/user.entity';
import { usePostLogin } from '../../../../../api/auth/postLogin';
import { Id, toast } from 'react-toastify';
import i18n from '../../../../../core/i18n';
import { AxiosError } from 'axios';
import { useState } from 'react';

const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastId, setToastId] = useState<Id | null>(null);

  const handleLoginError = (error: AxiosError) => {
    let message;
    if (error.response && error.response.status === 401) {
      message = i18n.t('auth.error.invalidCredentials');
    } else {
      message = i18n.t('auth.error.loginFailed');
    }

    setErrorMessage(message);

    if (toastId) {
      toast.update(toastId, {
        render: message,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const { mutateAsync: loginUser, isPending } = usePostLogin({
    onMutate: () => {
      const id = toast.loading(i18n.t('common.formSending'));
      setToastId(id);
    },
    onSuccess: () => {
      // TODO: set login state from store
      if (toastId) {
        toast.update(toastId, {
          render: i18n.t('auth.success.loginSuccess'),
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
      }
    },
    onError: handleLoginError,
    onSettled: () => {
      setToastId(null);
      toast.clearWaitingQueue();
    },
  });

  const onSubmit = (data: LoginBody) => {
    loginUser(data);
  };

  return { onSubmit, errorMessage, isPending };
};

export default useLogin;
