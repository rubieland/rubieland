import { useCreatePostTabs } from '../../hooks/useCreatePostTabs';
import TabsComponent from '@/ui/components/Tabs/TabsComponent';

const CreatePostTabs = () => {
  const tabs = useCreatePostTabs();

  return <TabsComponent defaultTab="form" tabs={tabs} />;
};

export default CreatePostTabs;
