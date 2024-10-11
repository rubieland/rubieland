import { useGetPostDetailsBackOffice } from '@/api/backOffice/blog/getPostDetailsBackOffice';
import { usePostFormValidation } from '../hooks/usePostFormValidation';
import TabsComponent from '@/ui/components/Tabs/TabsComponent';
import { useUpdatePostTabs } from '../hooks/useUpdatePostTabs';
import PageLoader from '@/ui/components/Loader/PageLoader';
import { useParams } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import './styles/PostPage.scss';

const UpdatePostPage = () => {
  const { postId } = useParams({
    from: '/back-office/blog/update-post/$postId',
  });
  const { data: existingPostData, isPending } = useGetPostDetailsBackOffice({
    postId,
  });

  const formMethods = usePostFormValidation({ existingPostData });

  const tabs = useUpdatePostTabs({
    existingPostData,
    formMethods,
    postId,
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
