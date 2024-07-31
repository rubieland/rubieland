import { zodResolver } from '@hookform/resolvers/zod';
import i18n from '../../../../core/i18n';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const FormTestsSchema = z.object({
  email: z
    .string()
    .min(1, { message: i18n.t('form.errors.requiredField') })
    .max(60, { message: i18n.t('form.errors.inputMaxLength', { max: 60 }) })
    .email({ message: i18n.t('form.errors.invalidEmailFormat') }),
  password: z
    .string()
    .min(8, { message: i18n.t('form.errors.inputMinLength', { min: 8 }) })
    .max(60, { message: i18n.t('form.errors.inputMaxLength', { max: 60 }) }),
  description: z
    .string()
    .min(8, { message: i18n.t('form.errors.inputMinLength', { min: 8 }) })
    .max(60, { message: i18n.t('form.errors.inputMaxLength', { max: 60 }) }),
});

export type FormTestsSchemaFormData = z.infer<typeof FormTestsSchema>;

export const useFormTestsValidation = () => {
  return useForm<FormTestsSchemaFormData>({
    defaultValues: {
      email: '',
      password: '',
      description: '',
    },
    resolver: zodResolver(FormTestsSchema),
    mode: 'onBlur',
  });
};
