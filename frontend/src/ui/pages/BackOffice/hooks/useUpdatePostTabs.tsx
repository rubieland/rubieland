import UpdatePostFormTab from '../BackOfficeBlog/components/UpdatePostFormTab';
import PostPreview from '../BackOfficeBlog/components/PostPreview';
import { PostSchemaFormData } from './usePostFormValidation';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TabType } from '@/types/tabs';

interface UseUpdatePostTabsType {
  formMethods: UseFormReturn<PostSchemaFormData>;
  postId: string;
}

export const useUpdatePostTabs = ({
  formMethods,
  postId,
}: UseUpdatePostTabsType) => {
  const { t } = useTranslation();

  const updatePostTabs: TabType[] = [
    {
      label: t('pages.backOffice.blog.updatePost'),
      value: 'form',
      component: (
        <UpdatePostFormTab formMethods={formMethods} postId={postId} />
      ),
    },
    {
      label: t('common.preview'),
      value: 'preview',
      component: <PostPreview formMethods={formMethods} />,
    },
  ];

  return updatePostTabs;
};
