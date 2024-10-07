import CreatePostForm from '../BackOfficeBlog/components/CreatePostForm';
import PostPreview from '../BackOfficeBlog/components/PostPreview';
import { useTranslation } from 'react-i18next';
import { TabType } from '@/types/tabs';

export const useCreatePostTabs = () => {
  const { t } = useTranslation();

  const createPostTabs: TabType[] = [
    {
      label: t('pages.backOffice.blog.createPost'),
      value: 'form',
      component: <CreatePostForm />,
    },
    {
      label: t('common.preview'),
      value: 'preview',
      component: <PostPreview />,
    },
  ];

  return createPostTabs;
};
