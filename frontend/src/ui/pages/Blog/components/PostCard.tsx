import defaultImgMedium from '../../../../assets/illustrations/blog_default_img_medium.png';
import defaultImgSmall from '../../../../assets/illustrations/blog_default_img_small.png';
import { API_BLOG_PICTURES_PATH, API_URL } from '../../../../core/envConfig';
import ResponsiveImage from '../../../components/Image/ResponsiveImage';
import { useTranslation } from 'react-i18next';
import '../styles/PostCard.scss';

interface PostCardProps {
  imageUrl: string | null;
  excerpt: string;
  title: string;
  date: string;
}

const imageSources = [
  { media: '(min-width: 500px)', srcSet: defaultImgMedium },
];

const PostCard = ({ title, excerpt, date, imageUrl }: PostCardProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.blog.postCard',
  });

  return (
    <article className="post-card">
      <div className="post-card-image-container">
        {!imageUrl ? (
          <ResponsiveImage
            defaultSrc={defaultImgSmall}
            alt={`Image - ${title}`}
            srcSet={imageSources}
          />
        ) : (
          <img
            src={`${API_URL}/${API_BLOG_PICTURES_PATH}/${imageUrl}`}
            alt={`Image - ${title}`}
          />
        )}
      </div>
      <div className="post-card-content">
        <h3 className="post-card-title">{title}</h3>
        <p className="post-card-excerpt">{excerpt}</p>
        <footer className="post-card-footer">
          <span className="post-card-date">{date}</span>
          <span className="post-card-read-more">{t('readMore')}</span>
        </footer>
      </div>
    </article>
  );
};

export default PostCard;
