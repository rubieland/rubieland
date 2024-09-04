import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import i18n from '../../../../../core/i18n';
import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: i18n.t('form.errors.requiredField') })
    .max(60, { message: i18n.t('form.errors.inputMaxLength', { max: 60 }) })
    .email({ message: i18n.t('form.errors.invalidEmailFormat') }),
  password: z
    .string()
    .min(8, {
      message: i18n.t('form.errors.inputMinLength', { minLength: 8 }),
    })
    .max(60, {
      message: i18n.t('form.errors.inputMaxLength', { maxLength: 60 }),
    })
    .refine((value) => /[a-z]/.test(value), {
      message: i18n.t('form.errors.minLowercase'),
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: i18n.t('form.errors.minUppercase'),
    })
    .refine((value) => /\d/.test(value), {
      message: i18n.t('form.errors.minNumbers'),
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: i18n.t('form.errors.minSymbols'),
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
