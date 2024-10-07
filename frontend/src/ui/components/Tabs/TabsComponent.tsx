import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabType } from '@/types/tabs';

interface TabsComponentProps {
  defaultTab: string;
  tabs: TabType[];
}

const TabsComponent = ({ defaultTab, tabs }: TabsComponentProps) => {
  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList className="tw-w-full">
        {tabs.map((tab) => (
          <TabsTrigger className="tw-w-full" key={tab.label} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.label} value={tab.value}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsComponent;
