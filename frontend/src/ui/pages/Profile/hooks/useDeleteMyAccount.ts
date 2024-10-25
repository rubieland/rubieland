import { useDeleteAccount } from '@/api/user/deleteAccount';
import { QueryKeysEnum } from '@/enums/queryKeys';
import { queryClient } from '@/api/reactQuery';
import { useTranslation } from 'react-i18next';
import useLogout from '@/hooks/useLogout';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useDeleteMyAccount = () => {
  const { t } = useTranslation();

  const handleDeleteMyAccountError = (error: unknown) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        return toast.error(t('form.user.errors.userNotFound'));
      } else {
        return toast.error(t('form.user.errors.deleteAccountFailed'));
      }
    }
    console.error('Unexpected error:', error);
    return toast.error(t('common.genericError'));
  };

  const { handleLogout } = useLogout();

  const { mutateAsync: deleteAccount, isPending } = useDeleteAccount({
    onSuccess: async () => {
      await handleLogout();
      await queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.USERS] });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.MY_PROFILE],
      });

      toast.success(t('form.user.success.deleteAccountSuccess'));
    },
    onError: handleDeleteMyAccountError,
  });

  const handleDeleteMyAccount = async () => {
    const loadingToastId = toast.loading(
      t('form.user.loading.deleteAccountLoading'),
    );

    try {
      const response = await deleteAccount(undefined);
      toast.dismiss(loadingToastId);

      return response;
    } catch (error) {
      toast.dismiss(loadingToastId);
      throw error;
    }
  };

  return { handleDeleteMyAccount, isPending };
};

export default useDeleteMyAccount;
