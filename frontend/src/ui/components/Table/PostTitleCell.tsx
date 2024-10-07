import { Link } from '@tanstack/react-router';
import './styles/PostTitleCell.scss';

interface PostTitleCellProps {
  postId: string;
  title: string;
}

const PostTitleCell = ({ postId, title }: PostTitleCellProps) => {
  return (
    <span className="post-title-cell">
      <Link to={`/back-office/blog/posts/${postId}`}>{title}</Link>
    </span>
  );
};

export default PostTitleCell;
