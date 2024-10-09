import Separator from '@/ui/components/Separator/Separator';
import '../styles/CreatePostTabsHeader.scss';

interface CreatePostTabsHeaderProps {
  title: string;
}

const CreatePostTabsHeader = ({ title }: CreatePostTabsHeaderProps) => {
  return (
    <header className="create-post-tab-header">
      <h2>{title}</h2>
      <Separator />
    </header>
  );
};

export default CreatePostTabsHeader;
