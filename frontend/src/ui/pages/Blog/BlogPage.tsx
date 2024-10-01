import { useGetAllPosts } from '../../../api/blog/getAllPosts';
import EmptyBlogSection from './components/EmptyBlogSection';
import PageLoader from '../../components/Loader/PageLoader';
import PostCardList from './components/PostCardList';
import { useTranslation } from 'react-i18next';
import './styles/BlogPage.scss';

const BlogPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.blog' });
  const { data: posts, isLoading } = useGetAllPosts();
  const publishedPosts = posts?.filter((a) => a.isPublished);
  const isBlogEmpty = !publishedPosts || publishedPosts.length === 0;
  const { data: posts, isLoading, error, refetch } = useGetAllPosts();

  if (isLoading) return <PageLoader isLoading={isLoading} />;
  if (error)
    return <ErrorComponent message={error.message} onRetry={() => refetch()} />;

  return (
    <div className="blog-page-main-container">
      <h2 className="main-title">{t('title')}</h2>
      {isBlogEmpty ? (
        <EmptyBlogSection />
      ) : (
        <PostCardList posts={publishedPosts} />
      )}
    </div>
  );
};

export default BlogPage;
