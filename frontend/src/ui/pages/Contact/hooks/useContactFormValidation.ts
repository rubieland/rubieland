import { nameRegex } from '../../AuthPages/Register/hooks/useRegisterFormValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/models/user/user.entity';
import { useForm } from 'react-hook-form';
import i18n from '@/core/i18n';
import { z } from 'zod';

export const ContactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: i18n.t('form.errors.inputMinLength', { minLength: 2 }),
    })
    .max(60, {
      message: i18n.t('form.errors.inputMaxLength', { maxLength: 60 }),
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
  subject: z
    .string()
    .min(5, {
      message: i18n.t('form.errors.inputMinLength', { minLength: 5 }),
    })
    .max(5000, {
      message: i18n.t('form.errors.inputMaxLength', { maxLength: 5000 }),
    }),
  message: z
    .string()
    .min(5, {
      message: i18n.t('form.errors.inputMinLength', { minLength: 5 }),
    })
    .max(5000, {
      message: i18n.t('form.errors.inputMaxLength', { maxLength: 5000 }),
    }),
});

export type ContactFormSchemaFormData = z.infer<typeof ContactFormSchema>;

export const useContactFormValidation = (existingUserData: User | null) => {
  const fullName = existingUserData
    ? `${existingUserData.firstName} ${existingUserData.lastName}`
    : '';
  const email = existingUserData?.email || '';

  const values = {
    fullName,
    email,
    subject: '',
    message: '',
  };

  return useForm<ContactFormSchemaFormData>({
    values,
    defaultValues: {
      ...values,
    },
    resolver: zodResolver(ContactFormSchema),
    mode: 'onBlur',
  });
};
