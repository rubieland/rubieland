import { validatePhoneNumber } from '../../../../../utils/phone.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import i18n from '../../../../../core/i18n';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const nameRegex: RegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/i; // accepts only letters, hyphens, spaces, and apostrophes

export const RegisterFormSchema = z
  .object({
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
    confirmPassword: z.string(),
    phone: z.string().refine(
      (value) => {
        return validatePhoneNumber(value);
      },
      {
        message: i18n.t('form.errors.invalidPhone'),
      },
    ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: i18n.t('form.errors.passwordsDontMatch'),
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterFormSchemaFormData = z.infer<typeof RegisterFormSchema>;

export const useRegisterFormValidation = () => {
  return useForm<RegisterFormSchemaFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    resolver: zodResolver(RegisterFormSchema),
    mode: 'onBlur',
  });
};
