import { forbiddenCharsRegex } from '@/utils/string.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  acceptedMimeTypes,
  acceptedMimeTypesString,
  postPictureMaxFileSize,
} from '@/core/fileUploadConfig';
import { useEffect } from 'react';
import i18n from '@/core/i18n';
import { z } from 'zod';

export const PostSchema = z.object({
  title: z
    .string()
    .min(5, { message: i18n.t('form.errors.inputMinLength', { minLength: 5 }) })
    .max(100, { message: i18n.t('form.errors.inputMaxLength', { max: 100 }) })
    .refine((value) => !forbiddenCharsRegex.test(value), {
      message: i18n.t('form.errors.hasForbiddenChars'),
    }),
  content: z
    .string()
    .min(100, {
      message: i18n.t('form.errors.inputMinLength', { minLength: 100 }),
    })
    .max(10000, {
      message: i18n.t('form.errors.inputMaxLength', { max: 10000 }),
    })
    .refine((value) => !forbiddenCharsRegex.test(value), {
      message: i18n.t('form.errors.hasForbiddenChars'),
    }),
  picture: z
    .instanceof(File)
    .refine((file) => acceptedMimeTypes.includes(file.type), {
      message: i18n.t('form.errors.invalidFileType', {
        types: acceptedMimeTypesString,
      }),
    })
    .refine((file) => file.size <= postPictureMaxFileSize, {
      message: i18n.t('form.errors.fileTooLarge', { limit: 10 }),
    })
    .nullable(),
  isPublished: z.boolean(),
});

export type PostSchemaFormData = z.infer<typeof PostSchema>;

type UsePostFormValidationType = {
  existingPostData?: Omit<PostSchemaFormData, 'picture'>;
};

export const usePostFormValidation = ({
  existingPostData,
}: UsePostFormValidationType = {}) => {
  const formMethods = useForm<PostSchemaFormData>({
    defaultValues: {
      title: '',
      content: '',
      picture: null,
      isPublished: false,
    },
    resolver: zodResolver(PostSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (existingPostData) {
      formMethods.reset(existingPostData);
    }
  }, [existingPostData, formMethods]);

  return formMethods;
};
