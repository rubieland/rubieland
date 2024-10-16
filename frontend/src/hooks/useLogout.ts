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

  const { mutateAsync: logout } = usePostLogout({
    onSuccess: () => {
      // redirect user to /login
      navigate({ to: '/login' });

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

  return { logout };
};

export default useLogout;
