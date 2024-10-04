import defaultImgMedium from '../../../../../assets/illustrations/blog_default_img_medium.png';
import defaultImgSmall from '../../../../../assets/illustrations/blog_default_img_small.png';
import { API_BLOG_PICTURES_PATH, API_URL } from '../../../../../core/envConfig';
import ResponsiveImage from '../../../../components/Image/ResponsiveImage';
import { Post } from '../../../../../models/posts/post.entity';
import { useNavigate } from '@tanstack/react-router';
import PenSquare from '../../../../components/Icons/PenSquare';
import Bin from '../../../../components/Icons/Bin';
import colors from '../../../../../assets/styles/colors';

const imageSources = [
  { media: '(min-width: 500px)', srcSet: defaultImgMedium },
];

interface BackOfficePostCardProps {
  post: Post;
}

const BackOfficePostCard = ({ post }: BackOfficePostCardProps) => {
  const navigate = useNavigate();

  const navigateToPostDetails = () => {
    navigate({ to: `/blog/posts/${post.id}` });
  };

  return (
    <article className="posts-list-item" onClick={navigateToPostDetails}>
      <div className="posts-list-item-image-container">
        {post.picture ? (
          <img
            src={`${API_URL}/${API_BLOG_PICTURES_PATH}/${post.picture}`}
            alt={`Image - ${post.title}`}
          />
        ) : (
          <ResponsiveImage
            defaultSrc={defaultImgSmall}
            alt={`Image - ${post.title}`}
            srcSet={imageSources}
          />
        )}
      </div>
      <div className="post-item-bottom">
        <div className="post-item-data">
          <h3 className="post-item-title">{post.title}</h3>
          <p className="post-item-date">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p className="post-item-content">
            {post.content.slice(0, 50) + '...'}
          </p>
        </div>
        <div className="post-item-actions">
          <PenSquare width={24} height={24} stroke={colors.primary} />
          <Bin width={24} height={24} stroke={colors.red} />
        </div>
      </div>
    </article>
  );
};

export default BackOfficePostCard;
