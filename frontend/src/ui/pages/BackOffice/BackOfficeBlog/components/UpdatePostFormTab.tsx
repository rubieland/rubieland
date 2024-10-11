import { PostSchemaFormData } from '../../hooks/usePostFormValidation';
import useCreateNewPost from '../../hooks/useCreateNewPost';
import { PostBody } from '@/models/posts/post.entity';
import { useNavigate } from '@tanstack/react-router';
import { isFormValid } from '@/utils/form.utils';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import UpdatePostForm from './UpdatePostForm';
import PostTabsHeader from './PostTabsHeader';
import '../styles/PostFormTab.scss';
import { useEffect } from 'react';

interface UpdatePostFormTabProps {
  formMethods: UseFormReturn<PostSchemaFormData>;
  existingPostData: PostBody;
}

const UpdatePostFormTab = ({
  formMethods,
  existingPostData,
}: UpdatePostFormTabProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.blog',
  });

  // TODO: add defaultValues props and remove console.log()
  console.log('existing post data -- ', existingPostData);

  const navigate = useNavigate();

  const { onSubmit } = useCreateNewPost();
  const { handleSubmit, watch, formState, reset } = formMethods;
  const watchedValues = watch(['title', 'content']);
  const isFormFilled = isFormValid(watchedValues);

  const isSubmitSuccessful = formState.isSubmitSuccessful;

  // reset form when the post is successfully updated and navigate back to the blog page
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      navigate({ to: '/back-office/blog' });
    }
  }, [isSubmitSuccessful, reset, navigate]);

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