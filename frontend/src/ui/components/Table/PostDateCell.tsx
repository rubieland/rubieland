import { useTranslation } from 'react-i18next';
import './styles/PostDateCell.scss';

interface PostDateCellProps {
  dateString: string;
}

const PostDateCell = ({ dateString }: PostDateCellProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.tables.posts',
  });

  const formattedDate = t('updatedAtDate', { date: new Date(dateString) });

  return <span className="post-date-cell">{formattedDate}</span>;
};

export default PostDateCell;
