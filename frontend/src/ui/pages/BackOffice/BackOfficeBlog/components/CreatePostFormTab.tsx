import { useTranslation } from 'react-i18next';
import CreatePostForm from './CreatePostForm';
import '../styles/CreatePostFormTab.scss';

const CreatePostFormTab = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.blog',
  });

  // TODO: create useCreatePost.ts hook file and add onSubmit in <CreatePostFormTab /> props
  const onSubmit = () => {
    console.log('Submit create post form');
  };

  return (
    <section className="create-post-tab">
      <h2>{t('createPost')}</h2>
      <CreatePostForm onSubmit={onSubmit} />
    </section>
  );
};

export default CreatePostFormTab;
