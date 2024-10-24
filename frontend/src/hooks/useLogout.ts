import { useSessionStoreActions } from '../stores/SessionStore';
import { usePostLogout } from '../api/auth/postLogout';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const useLogout = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { resetSession } = useSessionStoreActions();
  const navigate = useNavigate();

  const { mutateAsync: logout, isPending } = usePostLogout({
    onSuccess: async () => {
      // redirect user to /login
      await navigate({ to: '/login' });

      // reset session store data
      resetSession();

      // invalidate cached queries
      queryClient.removeQueries();

      // display toast with success message
      toast.success(t('auth.success.logoutSuccess'));
    },
    onError: (error) => {
      // if error occurs while logging out, display error toast
      toast.error(t('auth.error.logoutFailed'));
      throw error;
    },
  });

  const handleLogout = async () => {
    const loadingToastId = toast.loading(t('auth.loading.logoutLoading'));

    try {
      const response = await logout(undefined);
      toast.dismiss(loadingToastId);

      return response;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.dismiss(loadingToastId);
      throw error;
    }
  };

  return { handleLogout, isPending };
};

export default useLogout;
