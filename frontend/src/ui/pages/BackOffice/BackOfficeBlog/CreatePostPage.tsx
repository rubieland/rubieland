import { usePostFormValidation } from '../hooks/usePostFormValidation';
import { useCreatePostTabs } from '../hooks/useCreatePostTabs';
import TabsComponent from '@/ui/components/Tabs/TabsComponent';
import { FormProvider } from 'react-hook-form';
import './styles/PostPage.scss';

const CreatePostPage = () => {
  const formMethods = usePostFormValidation();
  const tabs = useCreatePostTabs({ formMethods });

  return (
    <FormProvider {...formMethods}>
      <section className="post-page-section">
        <TabsComponent defaultTab="form" tabs={tabs} />
      </section>
    </FormProvider>
  );
};

export default CreatePostPage;
