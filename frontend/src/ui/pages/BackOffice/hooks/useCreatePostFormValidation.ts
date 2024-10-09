import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  acceptedMimeTypes,
  acceptedMimeTypesString,
  postPictureMaxFileSize,
} from '@/core/fileUploadConfig';
import i18n from '@/core/i18n';
import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(5, { message: i18n.t('form.errors.inputMinLength', { minLength: 5 }) })
    .max(100, { message: i18n.t('form.errors.inputMaxLength', { max: 100 }) }),
  content: z
    .string()
    .min(100, {
      message: i18n.t('form.errors.inputMinLength', { minLength: 100 }),
    })
    .max(10000, {
      message: i18n.t('form.errors.inputMaxLength', { max: 10000 }),
    }),
  picture: z
    .array(z.instanceof(File))
    .refine(
      (files) => {
        return files.length === 1;
      },
      {
        message: i18n.t('form.errors.oneFileLimit'),
      },
    )
    .refine(
      (files) => {
        return files.every((file) => acceptedMimeTypes.includes(file.type));
      },
      {
        message: i18n.t('form.errors.invalidFileType', {
          types: acceptedMimeTypesString,
        }),
      },
    )
    .refine(
      (files) => {
        return files.every((file) => file.size <= postPictureMaxFileSize);
      },
      {
        message: i18n.t('form.errors.fileTooLarge', { limit: 10 }),
      },
    )
    .nullable(),
  isPublished: z.boolean(),
});

export type CreatePostSchemaFormData = z.infer<typeof CreatePostSchema>;

export const useCreatePostFormValidation = () => {
  return useForm<CreatePostSchemaFormData>({
    defaultValues: {
      title: '',
      content: '',
      picture: null,
      isPublished: false,
    },
    resolver: zodResolver(CreatePostSchema),
    mode: 'onBlur',
  });
};
