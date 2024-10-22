import { useUpdateProfile } from '@/api/user/updateProfile';
import { AxiosError } from 'axios';
import { QueryKeysEnum } from '@/enums/queryKeys';
import { useTranslation } from 'react-i18next';
import { queryClient } from '@/api/reactQuery';
import { UpdateProfileBody } from '@/models/user/user.entity';
import { toast } from 'sonner';

export const useUpdateMyProfile = () => {
  const { t } = useTranslation();

  const handleUpdateMyProfileError = (error: unknown) => {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 400:
          return toast.error(t('form.user.errors.userUpdateFailed'));
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

  const { mutateAsync: updateMyProfile, isPending } = useUpdateProfile({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.USERS],
      });

      await queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.MY_PROFILE],
      });

      toast.success(t('form.user.success.userUpdateSuccess'));
    },

    onError: handleUpdateMyProfileError,
  });

  const onSubmit = async (newData: UpdateProfileBody) => {
    const loadingToastId = toast.loading(
      t('form.user.loading.userUpdateLoading'),
    );

    try {
      const response = await updateMyProfile({ newData });
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

export default useUpdateMyProfile;
