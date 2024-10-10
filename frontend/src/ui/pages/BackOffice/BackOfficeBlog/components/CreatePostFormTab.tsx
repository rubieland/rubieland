import { CreatePostSchemaFormData } from '../../hooks/useCreatePostFormValidation';
import useCreateNewPost from '../../hooks/useCreateNewPost';
import CreatePostTabsHeader from './CreatePostTabsHeader';
import { isFormValid } from '@/utils/form.utils';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CreatePostForm from './CreatePostForm';
import '../styles/CreatePostFormTab.scss';

interface CreatePostFormTabProps {
  formMethods: UseFormReturn<CreatePostSchemaFormData>;
}

const CreatePostFormTab = ({ formMethods }: CreatePostFormTabProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.blog',
  });

  const { onSubmit } = useCreateNewPost();
  const { handleSubmit, watch, formState, reset } = formMethods;
  const watchedValues = watch(['title', 'content']);
  const isFormFilled = isFormValid(watchedValues);

  const isSubmitSuccessful = formState.isSubmitSuccessful;

  return (
    <section>
      <CreatePostTabsHeader title={t('createPost')} />
      <div className="create-post-tab-form">
        <CreatePostForm
          isSubmitSuccessful={isSubmitSuccessful}
          handleSubmit={handleSubmit}
          isFormFilled={isFormFilled}
          onSubmit={onSubmit}
          reset={reset}
        />
      </div>
    </section>
  );
};

export default CreatePostFormTab;
