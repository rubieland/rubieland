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
        icon={<PenSquare width={24} height={24} stroke={colors.white} />}
        onClick={() => console.log(t('edit'), 'postId:', postId)}
        iconPosition="right"
        title={t('edit')}
        style="secondary"
        outlined
      />
      <CustomButton
        icon={<Bin width={24} height={24} stroke={colors.white} />}
        onClick={() => console.log(t('delete'), 'postId:', postId)}
        iconPosition="right"
        title={t('delete')}
        style="error"
      />
    </div>
  );
};

export default PostActionsCell;
