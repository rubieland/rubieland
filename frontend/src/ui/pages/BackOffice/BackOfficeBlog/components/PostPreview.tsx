import { useTranslation } from 'react-i18next';

const PostPreview = () => {
  const { t } = useTranslation();

  // TODO: find a way to receive the post data and display it

  return (
    <div>
      <h2>{t('common.preview')}</h2>
    </div>
  );
};

export default PostPreview;
