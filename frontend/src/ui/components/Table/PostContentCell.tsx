import './styles/PostContentCell.scss';

interface PostContentCellProps {
  content: string;
}

const PostContentCell = ({ content }: PostContentCellProps) => {
  return (
    <span className="post-content-cell">{content.slice(0, 50) + '...'}</span>
  );
};

export default PostContentCell;
