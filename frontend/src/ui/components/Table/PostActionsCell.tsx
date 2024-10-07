import CustomButton from '../Button/CustomButton';
import { useTranslation } from 'react-i18next';
import colors from '@/assets/styles/colors';
import PenSquare from '../Icons/PenSquare';
import './styles/PostActionsCell.scss';
import Bin from '../Icons/Bin';

interface PostActionsCellProps {
  postId: string;
}

const PostActionsCell = ({ postId }: PostActionsCellProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.tables.posts',
  });

  return (
    <div className="post-actions-cell">
      <CustomButton
        onClick={() => console.log(t('edit'), 'postId:', postId)}
        title={t('edit')}
        style="secondary"
        icon={<PenSquare width={24} height={24} stroke={colors.white} />}
        iconPosition="right"
        outlined
      />
      <CustomButton
        onClick={() => console.log(t('delete'), 'postId:', postId)}
        title={t('delete')}
        icon={<Bin width={24} height={24} stroke={colors.white} />}
        iconPosition="right"
        style="error"
      />
    </div>
  );
};

export default PostActionsCell;
