import { CreatePostSchemaFormData } from '../../hooks/useCreatePostFormValidation';
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

  const { handleSubmit, watch } = formMethods;
  const watchedValues = watch(['title', 'content']);
  const isFormFilled = isFormValid(watchedValues);

  const onSubmit = (data: CreatePostSchemaFormData) => {
    console.log('Submit create post form');
    console.log('Data submitted:  ', data);
  };

  return (
    <section>
      <CreatePostTabsHeader title={t('createPost')} />
      <div className="create-post-tab-form">
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
