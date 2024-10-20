import { UpdateProfileBody } from '@/models/user/user.entity';
import { api } from '../axios';
import { MutationConfig } from '../reactQuery';
import { useMutation } from '@tanstack/react-query';

type UpdateProfileType = {
  newData: UpdateProfileBody;
};

const updateProfile = async ({ newData }: UpdateProfileType) => {
  const formData = new FormData();
  formData.append('firstName', newData.firstName);
  formData.append('lastName', newData.lastName);
  formData.append('phone', newData.phone);
  formData.append('email', newData.email);
  formData.append('currentPassword', newData.currentPassword ?? '');
  formData.append('newPassword', newData.newPassword ?? '');
  formData.append('confirmNewPassword', newData.confirmNewPassword ?? '');

  if (typeof newData.avatar === 'string') {
    formData.append('avatar', newData.avatar);
  } else {
    formData.append('avatar', newData.avatar as Blob);
  }

  const response = await api.put(`/profile/update-profile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

type UseUpdateProfileOptions = MutationConfig<typeof updateProfile>;

export const useUpdateProfile = (config: UseUpdateProfileOptions) => {
  return useMutation({
    ...config,
    mutationFn: ({ newData }: UpdateProfileType) => updateProfile({ newData }),
  });
};
