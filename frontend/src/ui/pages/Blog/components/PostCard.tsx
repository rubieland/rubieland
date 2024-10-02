import defaultImgMedium from '../../../../assets/illustrations/blog_default_img_medium.png';
import defaultImgSmall from '../../../../assets/illustrations/blog_default_img_small.png';
import { API_BLOG_PICTURES_PATH, API_URL } from '../../../../core/envConfig';
import ResponsiveImage from '../../../components/Image/ResponsiveImage';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import '../styles/PostCard.scss';

interface PostCardProps {
  imageUrl: string | null;
  content: string;
  postId: string;
  title: string;
  date: string;
}

const imageSources = [
  { media: '(min-width: 500px)', srcSet: defaultImgMedium },
];

const PostCard = ({
  imageUrl,
  content,
  postId,
  title,
  date,
}: PostCardProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.blog.postCard',
  });
  const navigate = useNavigate();
  const excerpt: string = content.slice(0, 100) + '...';

  const navigateToPostDetail = () => {
    navigate({ to: `/blog/posts/${postId}` });
  };

  // navigate to post detail page when Enter key is pressed while the card is focused
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') e.preventDefault();
    else if (e.key === 'Enter') navigateToPostDetail();
  };

  return (
    <article
      aria-label={`${t('readMore')} - ${title}`}
      onClick={navigateToPostDetail}
      onKeyDown={handleKeyDown}
      className="post-card"
      tabIndex={0}
      role="link"
    >
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
            loading="lazy"
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
