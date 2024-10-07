import { API_BLOG_PICTURES_PATH, API_URL } from '@/core/envConfig';
import { useTranslation } from 'react-i18next';
import './styles/PostPictureCell.scss';

interface PostPictureCellProps {
  picture: string | null;
}

const PostPictureCell = ({ picture }: PostPictureCellProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.tables.posts',
  });

  return (
    <div className="post-picture-cell">
      {picture ? (
        <img
          src={`${API_URL}/${API_BLOG_PICTURES_PATH}/${picture}`}
          alt={t('pictureAlt')}
        />
      ) : (
        <span className="no-image">{t('noImage')}</span>
      )}
    </div>
  );
};

export default PostPictureCell;
