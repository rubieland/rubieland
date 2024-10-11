import { useGetPostDetailsBackOffice } from '@/api/backOffice/blog/getPostDetailsBackOffice';
import { usePostFormValidation } from '../hooks/usePostFormValidation';
import TabsComponent from '@/ui/components/Tabs/TabsComponent';
import { useUpdatePostTabs } from '../hooks/useUpdatePostTabs';
import { useParams } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import './styles/PostPage.scss';
import PageLoader from '@/ui/components/Loader/PageLoader';

const UpdatePostPage = () => {
  const formMethods = usePostFormValidation();
  const { postId } = useParams({
    from: '/back-office/blog/update-post/$postId',
  });
  const { data: existingPostData, isPending } = useGetPostDetailsBackOffice({
    postId,
  });
  const defaultValues = formMethods.getValues();

  const tabs = useUpdatePostTabs({
    formMethods,
    existingPostData: existingPostData ?? defaultValues,
  });

  if (isPending) return <PageLoader isLoading={isPending} />;

  return (
    <FormProvider {...formMethods}>
      <section className="post-page-section">
        <TabsComponent defaultTab="form" tabs={tabs} />
      </section>
    </FormProvider>
  );
};

export default UpdatePostPage;
