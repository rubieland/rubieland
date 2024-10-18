import { useTranslation } from 'react-i18next';
import './styles/PostStatusCell.scss';

interface PostStatusCellProps {
  value: boolean;
}

const PostStatusCell = ({ value }: PostStatusCellProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.tables.posts',
  });
  const status = value ? 'published' : 'unpublished';

  return (
    <div className="post-status-cell">
      <span className={`post-status post-status-${status}`}>{t(status)}</span>
    </div>
  );
};

export default PostStatusCell;
