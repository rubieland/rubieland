import Separator from '@/ui/components/Separator/Separator';
import '../styles/PostTabsHeader.scss';

interface PostTabsHeaderProps {
  title: string;
}

const PostTabsHeader = ({ title }: PostTabsHeaderProps) => {
  return (
    <header className="post-tab-header">
      <h2>{title}</h2>
      <Separator />
    </header>
  );
};

export default PostTabsHeader;
