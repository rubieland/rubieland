import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import { useGetAllPosts } from '../../../api/blog/getAllPosts';
import EmptyBlogSection from './components/EmptyBlogSection';
import PageLoader from '../../components/Loader/PageLoader';
import { Post } from '../../../models/posts/post.entity';
import PostCardList from './components/PostCardList';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
  filterPublishedPosts,
  checkIsBlogEmpty,
} from '../../../utils/blog.utils';
import './styles/BlogPage.scss';

const BlogPage = () => {
  const { t } = useTranslation();
  const { data: allPosts, isLoading, error, refetch } = useGetAllPosts();

  // we only show the published posts
  const publishedPosts: Post[] = filterPublishedPosts(allPosts) || [];
  const hasNoPublishedPosts: boolean = checkIsBlogEmpty(publishedPosts);

  if (isLoading) return <PageLoader isLoading={isLoading} />;
  if (error)
    return <ErrorComponent message={error.message} onRetry={refetch} />;

  return (
    <div className="blog-page-main-container">
      <Helmet>
        <title>{t('SEO.blog.title')}</title>
        <meta name="description" content={t('SEO.blog.description')} />
      </Helmet>
      <h2 className="main-title">{t('pages.blog.title')}</h2>
      {hasNoPublishedPosts ? (
        <EmptyBlogSection />
      ) : (
        <PostCardList posts={publishedPosts} />
      )}
    </div>
  );
};

export default BlogPage;
