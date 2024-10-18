import { PostSchemaFormData } from '../../hooks/usePostFormValidation';
import useCreateNewPost from '../../hooks/useCreateNewPost';
import { useNavigate } from '@tanstack/react-router';
import { isFormValid } from '@/utils/form.utils';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CreatePostForm from './CreatePostForm';
import PostTabsHeader from './PostTabsHeader';
import '../styles/PostFormTab.scss';
import { useEffect } from 'react';

interface CreatePostFormTabProps {
  formMethods: UseFormReturn<PostSchemaFormData>;
}

const CreatePostFormTab = ({ formMethods }: CreatePostFormTabProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.blog',
  });

  const navigate = useNavigate();

  const { onSubmit } = useCreateNewPost();
  const { handleSubmit, watch, formState, reset } = formMethods;
  const watchedValues = watch(['title', 'content']);
  const isFormFilled = isFormValid(watchedValues);

  const isSubmitSuccessful = formState.isSubmitSuccessful;

  // reset form when the post is successfully created and navigate back to the blog page
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      navigate({ to: '/back-office/blog' });
    }
  }, [isSubmitSuccessful, reset, navigate]);

  return (
    <section>
      <PostTabsHeader title={t('createPost')} />
      <div className="post-tab-form">
        <CreatePostForm
          handleSubmit={handleSubmit}
          isFormFilled={isFormFilled}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
};

export default CreatePostFormTab;
