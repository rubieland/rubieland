import CreatePostFormTab from '../BackOfficeBlog/components/CreatePostFormTab';
import PostPreview from '../BackOfficeBlog/components/PostPreview';
import { PostSchemaFormData } from './usePostFormValidation';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TabType } from '@/types/tabs';

interface UseCreatePostTabsType {
  formMethods: UseFormReturn<PostSchemaFormData>;
}

export const useCreatePostTabs = ({ formMethods }: UseCreatePostTabsType) => {
  const { t } = useTranslation();

  const createPostTabs: TabType[] = [
    {
      label: t('pages.backOffice.blog.createPost'),
      value: 'form',
      component: <CreatePostFormTab formMethods={formMethods} />,
    },
    {
      label: t('common.preview'),
      value: 'preview',
      component: <PostPreview formMethods={formMethods} />,
    },
  ];

  return createPostTabs;
};
