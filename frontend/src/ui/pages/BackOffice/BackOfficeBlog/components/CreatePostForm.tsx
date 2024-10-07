import { useTranslation } from 'react-i18next';

const CreatePostForm = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('pages.backOffice.blog.createPost')}</h2>
    </div>
  );
};

export default CreatePostForm;
