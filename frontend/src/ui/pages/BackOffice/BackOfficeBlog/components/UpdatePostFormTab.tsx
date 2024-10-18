import { PostSchemaFormData } from '../../hooks/usePostFormValidation';
import useUpdatePost from '../../hooks/useUpdatePost';
import { isFormValid } from '@/utils/form.utils';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import UpdatePostForm from './UpdatePostForm';
import PostTabsHeader from './PostTabsHeader';
import '../styles/PostFormTab.scss';

interface UpdatePostFormTabProps {
  formMethods: UseFormReturn<PostSchemaFormData>;
  postId: string;
}

const UpdatePostFormTab = ({ formMethods, postId }: UpdatePostFormTabProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.blog',
  });

  const { onSubmit } = useUpdatePost({ postId });
  const { handleSubmit, watch } = formMethods;
  const watchedValues = watch(['title', 'content']);
  const isFormFilled = isFormValid(watchedValues);

  return (
    <section>
      <PostTabsHeader title={t('updatePost')} />
      <div className="post-tab-form">
        <UpdatePostForm
          handleSubmit={handleSubmit}
          isFormFilled={isFormFilled}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
};

export default UpdatePostFormTab;
