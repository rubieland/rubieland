import { useTranslation } from 'react-i18next';
import { TabType } from '@/types/tabs';

export const useCreatePostTabs = () => {
  const { t } = useTranslation();

  const createPostTabs: TabType[] = [
    {
      label: t('pages.backOffice.blog.createPost'),
      value: 'form',
      component: (
        <div>
          <h2>{t('pages.backOffice.blog.createPost')}</h2>
        </div>
      ),
    },
    {
      label: t('common.preview'),
      value: 'preview',
      component: (
        <div>
          <h2>{t('common.preview')}</h2>
        </div>
      ),
    },
  ];

  return createPostTabs;
};
