import { UpdatePasswordBody } from '@/models/user/user.entity';
import { useUpdatePassword } from '@/api/user/updatePassword';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useUpdateMyPassword = () => {
  const { t } = useTranslation();

  const handleUpdateMyPasswordError = (error: unknown) => {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 400:
          return toast.error(t('form.user.errors.updatePasswordFailed'));
        case 401:
          return toast.error(t('form.user.errors.wrongCurrentPassword'));
        case 404:
          return toast.error(t('form.user.errors.userNotFound'));
        case 409:
          return toast.error(t('form.user.errors.userExistsInBase'));
        case 500:
          return toast.error(t('common.serverError'));
        default:
          return toast.error(t('common.genericError'));
      }
    }
    console.error('Unexpected error:', error);
    return toast.error(t('common.genericError'));
  };

  const { mutateAsync: updateMyPassword, isPending } = useUpdatePassword({
    onSuccess: async () => {
      toast.success(t('form.user.success.passwordUpdateSuccess'));
    },
    onError: handleUpdateMyPasswordError,
  });

  const onSubmit = async (newData: UpdatePasswordBody) => {
    const loadingToastId = toast.loading(
      t('form.user.loading.passwordUpdateLoading'),
    );

    try {
      const response = await updateMyPassword({ newData });
      toast.dismiss(loadingToastId);

      return response;
    } catch (error) {
      toast.dismiss(loadingToastId);
      throw error;
    }
  };

  return {
    onSubmit,
    isPending,
  };
};

export default useUpdateMyPassword;
