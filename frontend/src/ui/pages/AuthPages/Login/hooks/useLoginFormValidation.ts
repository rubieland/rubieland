import { zodResolver } from '@hookform/resolvers/zod';
import i18n from '../../../../../core/i18n';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: i18n.t('form.errors.requiredField') })
    .max(60, {
      message: i18n.t('form.errors.inputMaxLength', { maxLength: 60 }),
    })
    .email({ message: i18n.t('form.errors.invalidEmailFormat') }),
  password: z
    .string()
    .min(8, {
      message: i18n.t('form.errors.inputMinLength', { minLength: 8 }),
    })
    .max(60, {
      message: i18n.t('form.errors.inputMaxLength', { maxLength: 60 }),
    }),
});

export type LoginFormSchemaFormData = z.infer<typeof LoginFormSchema>;

export const useLoginFormValidation = () => {
  return useForm<LoginFormSchemaFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginFormSchema),
    mode: 'onBlur',
  });
};
