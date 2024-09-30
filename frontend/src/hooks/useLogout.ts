import { useSessionStoreActions } from '../stores/SessionStore';
import { usePostLogout } from '../api/auth/postLogout';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Id, toast } from 'react-toastify';
import { useState } from 'react';

const useLogout = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [toastId, setToastId] = useState<Id | null>(null);
  const { resetSession } = useSessionStoreActions();
  const navigate = useNavigate();

  const { mutateAsync: logout } = usePostLogout({
    onMutate: () => {
      const id = toast.loading(t('common.loggingOut'));
      setToastId(id);
    },
    onSuccess: () => {
      // reset session store data
      resetSession();

      // invalidate cached queries
      queryClient.removeQueries();

      // redirect user to /login
      navigate({ to: '/login' });

      // display toast with success message
      if (toastId) {
        toast.update(toastId, {
          render: t('auth.success.logoutSuccess'),
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
        });
      }
    },
    onError: (error) => {
      // if error occurs while logging out, display error toast
      if (toastId) {
        toast.update(toastId, {
          render: t('auth.error.logoutFailed'),
          type: 'error',
          isLoading: false,
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
        });
      }
      console.error('Error during logout:', error);
    },
    onSettled: () => {
      // clear toast
      setToastId(null);
      toast.clearWaitingQueue();
    },
  });

  return { logout };
};

export default useLogout;
