import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import i18n from '@/core/i18n';
import { z } from 'zod';

export const UpdatePasswordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .refine((value) => !value || value.length >= 8, {
        message: i18n.t('form.errors.inputMinLength', { minLength: 8 }),
      })
      .refine((value) => !value || value.length <= 60, {
        message: i18n.t('form.errors.inputMaxLength', { maxLength: 60 }),
      })
      .refine((value) => !value || /[a-z]/.test(value), {
        message: i18n.t('form.errors.minLowercase'),
      })
      .refine((value) => !value || /[A-Z]/.test(value), {
        message: i18n.t('form.errors.minUppercase'),
      })
      .refine((value) => !value || /\d/.test(value), {
        message: i18n.t('form.errors.minNumbers'),
      })
      .refine((value) => !value || /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: i18n.t('form.errors.minSymbols'),
      }),
    newPassword: z
      .string()
      .refine((value) => !value || value.length >= 8, {
        message: i18n.t('form.errors.inputMinLength', { minLength: 8 }),
      })
      .refine((value) => !value || value.length <= 60, {
        message: i18n.t('form.errors.inputMaxLength', { maxLength: 60 }),
      })
      .refine((value) => !value || /[a-z]/.test(value), {
        message: i18n.t('form.errors.minLowercase'),
      })
      .refine((value) => !value || /[A-Z]/.test(value), {
        message: i18n.t('form.errors.minUppercase'),
      })
      .refine((value) => !value || /\d/.test(value), {
        message: i18n.t('form.errors.minNumbers'),
      })
      .refine((value) => !value || /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: i18n.t('form.errors.minSymbols'),
      }),
    confirmNewPassword: z.string(),
  })

  .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: i18n.t('form.errors.passwordsDontMatch'),
        path: ['confirmNewPassword'],
      });
    }
  });

export type UpdatePasswordFormSchemaFormData = z.infer<
  typeof UpdatePasswordFormSchema
>;

export const useUpdatePasswordFormValidation = () => {
  return useForm<UpdatePasswordFormSchemaFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(UpdatePasswordFormSchema),
    mode: 'onBlur',
  });
};
