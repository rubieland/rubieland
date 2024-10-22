import { nameRegex } from '../../AuthPages/Register/hooks/useRegisterFormValidation';
import { UpdateProfileBody } from '@/models/user/user.entity';
import { validatePhoneNumber } from '@/utils/phone.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import i18n from '@/core/i18n';
import { z } from 'zod';
import {
  acceptedMimeTypes,
  acceptedMimeTypesString,
  maxAvatarFileSize,
} from '@/core/fileUploadConfig';

export const UpdateProfileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: i18n.t('form.errors.inputMinLength', { minLength: 2 }),
    })
    .max(30, {
      message: i18n.t('form.errors.inputMaxLength', { maxLength: 30 }),
    })
    .refine((value) => nameRegex.test(value), {
      message: i18n.t('form.errors.invalidName'),
    }),
  lastName: z
    .string()
    .min(2, {
      message: i18n.t('form.errors.inputMinLength', { minLength: 2 }),
    })
    .max(30, {
      message: i18n.t('form.errors.inputMaxLength', { maxLength: 30 }),
    })
    .refine((value) => nameRegex.test(value), {
      message: i18n.t('form.errors.invalidName'),
    }),
  email: z
    .string()
    .min(1, { message: i18n.t('form.errors.requiredField') })
    .max(60, {
      message: i18n.t('form.errors.inputMaxLength', { maxLength: 60 }),
    })
    .email({ message: i18n.t('form.errors.invalidEmailFormat') }),
  avatar: z.union([
    z
      .instanceof(File)
      .refine((file) => acceptedMimeTypes.includes(file.type), {
        message: i18n.t('form.errors.invalidFileType', {
          types: acceptedMimeTypesString,
        }),
      })
      .refine((file) => file.size <= maxAvatarFileSize, {
        message: i18n.t('form.errors.fileTooLarge', { limit: 3 }),
      }),
    z.string().nullable(),
  ]),
  phone: z.string().refine(
    (value) => {
      return validatePhoneNumber(value);
    },
    {
      message: i18n.t('form.errors.invalidPhone'),
    },
  ),
});

export type UpdateProfileFormSchemaFormData = z.infer<
  typeof UpdateProfileFormSchema
>;

export const useUpdateProfileFormValidation = (
  existingProfileData: UpdateProfileBody | null,
) => {
  const values = {
    firstName: existingProfileData?.firstName ?? '',
    lastName: existingProfileData?.lastName ?? '',
    email: existingProfileData?.email ?? '',
    avatar: existingProfileData?.avatar ?? '',
    phone: existingProfileData?.phone ?? '',
  };

  const defaultValues = {
    ...values,
  };

  return useForm<UpdateProfileFormSchemaFormData>({
    values,
    defaultValues,
    resolver: zodResolver(UpdateProfileFormSchema),
    mode: 'onBlur',
  });
};
