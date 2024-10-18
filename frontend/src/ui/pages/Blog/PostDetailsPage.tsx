import defaultImgMedium from '../../../assets/illustrations/blog_default_img_medium.png';
import defaultImgSmall from '../../../assets/illustrations/blog_default_img_small.png';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import { API_BLOG_PICTURES_PATH, API_URL } from '../../../core/envConfig';
import { useGetPostDetails } from '../../../api/blog/getPostDetails';
import ResponsiveImage from '../../components/Image/ResponsiveImage';
import ChevronLeft from '../../components/Icons/Chevrons/ChevronLeft';
import { Link, Navigate, useParams } from '@tanstack/react-router';
import PageLoader from '../../components/Loader/PageLoader';
import { useIsAdmin } from '../../../stores/SessionStore';
import { useTranslation } from 'react-i18next';
import './styles/PostDetailsPage.scss';
import DOMPurify from 'dompurify';

const imageSources = [
  { media: '(min-width: 500px)', srcSet: defaultImgMedium },
];

const PostDetailsPage = () => {
  const { t } = useTranslation();
  const { postId } = useParams({ from: '/_app/blog/posts/$postId' });
  const isAdmin = useIsAdmin();

  const {
    data: post,
    isLoading,
    error,
    refetch,
  } = useGetPostDetails({
    postId,
  });

  if (isLoading) return <PageLoader isLoading={isLoading} />;

  if (!post)
    return (
      <ErrorComponent message={t('notFound.content')} showRedirectButton />
    );

  if (error)
    return <ErrorComponent message={error.message} onRetry={refetch} />;

  // check if the post is published and if the user is admin. If not, redirect user because he should not be able to see the post
  if (!post?.isPublished && !isAdmin) return <Navigate to="/blog" />;
  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <article className="post-details-main-container">
      <header className="post-details-header">
        <h2 className="post-details-title">{post.title}</h2>
        <p className="post-updated-date">{`${t('pages.blog.postDetailsPage.updatedOn', { date: new Date(post.updatedAt) })}`}</p>
        <div className="post-details-image-container">
          {!post.picture ? (
            <ResponsiveImage
              defaultSrc={defaultImgSmall}
              alt={`Image - ${post.title}`}
              srcSet={imageSources}
            />
          ) : (
            <img
              src={`${API_URL}/${API_BLOG_PICTURES_PATH}/${post.picture}`}
              alt={`Image - ${post.title}`}
              loading="lazy"
            />
          )}
        </div>
      </header>

      <div
        className="post-details-content"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
      <Link to="/blog" className="back-to-blog-link">
        <span>
          <ChevronLeft />
        </span>
        <span>{t('pages.blog.postDetailsPage.backToBlog')}</span>
      </Link>
    </article>
  );
};

export default PostDetailsPage;
