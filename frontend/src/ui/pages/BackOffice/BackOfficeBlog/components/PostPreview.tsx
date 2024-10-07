import { useTranslation } from 'react-i18next';

const PostPreview = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('common.preview')}</h2>
    </div>
  );
};

export default PostPreview;
