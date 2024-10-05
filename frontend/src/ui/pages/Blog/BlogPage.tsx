import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import { useGetAllPosts } from '../../../api/blog/getAllPosts';
import EmptyBlogSection from './components/EmptyBlogSection';
import PageLoader from '../../components/Loader/PageLoader';
import { useIsAdmin } from '../../../stores/SessionStore';
import { Post } from '../../../models/posts/post.entity';
import PostCardList from './components/PostCardList';
import { useTranslation } from 'react-i18next';
import {
  filterPublishedPosts,
  checkIsBlogEmpty,
} from '../../../utils/blog.utils';
import './styles/BlogPage.scss';

const BlogPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.blog' });
  const { data: allPosts, isLoading, error, refetch } = useGetAllPosts();
  const isAdmin: boolean = useIsAdmin();

  // a simple user must not see unpublished posts so we have to filter them
  const publishedPosts: Post[] = filterPublishedPosts(allPosts) || [];

  // if the user is a simple user, we need to check if there are published posts
  const hasNoPublishedPosts: boolean = checkIsBlogEmpty(publishedPosts);

  // if the user is an admin, we don't need to filter the posts, we just check if there are posts already created
  const isBlogEmpty: boolean = checkIsBlogEmpty(allPosts);

  if (isLoading) return <PageLoader isLoading={isLoading} />;
  if (error)
    return <ErrorComponent message={error.message} onRetry={refetch} />;

  return (
    <div className="blog-page-main-container">
      <h2 className="main-title">{t('title')}</h2>
      {isAdmin ? (
        <>
          {isBlogEmpty ? (
            <EmptyBlogSection />
          ) : (
            <PostCardList posts={allPosts || []} />
          )}
        </>
      ) : (
        <>
          {hasNoPublishedPosts ? (
            <EmptyBlogSection />
          ) : (
            <PostCardList posts={publishedPosts} />
          )}
        </>
      )}
    </div>
  );
};

export default BlogPage;
