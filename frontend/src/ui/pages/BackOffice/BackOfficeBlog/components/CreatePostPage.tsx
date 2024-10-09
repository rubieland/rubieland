import { useCreatePostFormValidation } from '../../hooks/useCreatePostFormValidation';
import { useCreatePostTabs } from '../../hooks/useCreatePostTabs';
import TabsComponent from '@/ui/components/Tabs/TabsComponent';
import { FormProvider } from 'react-hook-form';
import '../styles/CreatePostPage.scss';

const CreatePostPage = () => {
  const formMethods = useCreatePostFormValidation();
  const tabs = useCreatePostTabs({ formMethods });
  // TODO: delete CreatePostTabs and call useCreatePostTabs directly in this component
  // + add <FormProvider> to wrap the tabs and test if I can acceed to the form values in the PostPreview component
  return (
    <FormProvider {...formMethods}>
      <section className="create-post-section">
        <TabsComponent defaultTab="form" tabs={tabs} />
      </section>
    </FormProvider>
  );
};

export default CreatePostPage;
