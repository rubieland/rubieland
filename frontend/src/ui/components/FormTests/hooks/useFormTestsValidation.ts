import { isAtLeastNYearsOld, isInFuture } from '../../../../utils/date.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import i18n from '../../../../core/i18n';
import { isBefore } from 'date-fns';
import { z } from 'zod';

export const FormTestsSchema = z.object({
  email: z
    .string()
    .min(1, { message: i18n.t('form.errors.requiredField') })
    .max(60, { message: i18n.t('form.errors.inputMaxLength', { max: 60 }) })
    .email({ message: i18n.t('form.errors.invalidEmailFormat') }),
  password: z
    .string()
    .min(8, { message: i18n.t('form.errors.inputMinLength', { minLength: 8 }) })
    .max(60, {
      message: i18n.t('form.errors.inputMaxLength', { maxLength: 60 }),
    }),
  description: z
    .string()
    .min(8, { message: i18n.t('form.errors.inputMinLength', { minLength: 8 }) })
    .max(60, {
      message: i18n.t('form.errors.inputMaxLength', { maxLength: 60 }),
    }),
  isPublished: z.boolean(),
  gender: z
    .enum(['male', 'female'], {
      message: 'La valeur de ce champ doit être soit Homme soit Femme',
    })
    .nullable()
    .refine((value) => value !== null, i18n.t('form.errors.requiredField')),
  birthDate: z
    .string()
    .nullable()
    .refine(
      (value) => {
        if (!value) return true;
        return isAtLeastNYearsOld(value, 16);
      },
      {
        message: i18n.t('form.errors.minBirthDate', { min: 16 }),
      },
    )
    .refine(
      (value) => {
        if (!value) return true;
        return !isInFuture(value);
      },
      {
        message: i18n.t('form.errors.birthDateInFuture'),
      },
    )
    .refine(
      (value) => {
        const today = new Date();
        const minBirthDate = new Date(
          today.setFullYear(today.getFullYear() - 99),
        ).toISOString();
        const formattedMinBirthDate = minBirthDate.split('T')[0];

        if (!value) return true;
        return !isBefore(value, formattedMinBirthDate);
      },
      {
        message: i18n.t('form.errors.maxBirthDate', { max: 99 }),
      },
    ),
});

export type FormTestsSchemaFormData = z.infer<typeof FormTestsSchema>;

export const useFormTestsValidation = () => {
  return useForm<FormTestsSchemaFormData>({
    defaultValues: {
      email: '',
      password: '',
      birthDate: '',
      gender: 'male',
      description: '',
      isPublished: false,
    },
    resolver: zodResolver(FormTestsSchema),
    mode: 'onBlur',
  });
};
