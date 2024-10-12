import { usePostRegister } from '../../../../../api/auth/postRegister';
import { RegisterBody } from '../../../../../models/user/user.entity';
import { useTranslation } from 'react-i18next';
import { Id, toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { queryClient } from '@/api/reactQuery';
import { QueryKeysEnum } from '@/enums/queryKeys';
import { useNavigate } from '@tanstack/react-router';

const useRegister = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastId, setToastId] = useState<Id | null>(null);

  const handleRegisterError = (error: AxiosError) => {
    let message;
    if (error.response && error.response.status === 409) {
      message = t('auth.error.accountAlreadyExists');
    } else {
      message = t('auth.error.registerFailed');
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

  const { mutateAsync: registerUser, isPending } = usePostRegister({
    onMutate: () => {
      const id = toast.loading(t('common.formSending'));
      setToastId(id);
    },
    onSuccess: async () => {
      // update the users list received from api after successful register
      await queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.USERS] });

      if (toastId) {
        toast.update(toastId, {
          render: t('auth.success.registerSuccess'),
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
        });
      }

      navigate({ from: '/register', to: '/login' });
    },
    onError: handleRegisterError,
    onSettled: () => {
      setToastId(null);
      toast.clearWaitingQueue();
    },
  });

  const onSubmit = (data: RegisterBody) => {
    registerUser(data);
  };

  return { onSubmit, errorMessage, isPending };
};

export default useRegister;
