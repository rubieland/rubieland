import { useTranslation } from 'react-i18next';
import './styles/PostDateCell.scss';

interface PostDateCellProps {
  dateType: 'createdAt' | 'updatedAt';
  dateString: string;
}

const PostDateCell = ({ dateString, dateType }: PostDateCellProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.tables.posts',
  });

  const formattedDate = t(`${dateType}Date`, { date: new Date(dateString) });

  return <span className="post-date-cell">{formattedDate}</span>;
};

export default PostDateCell;
