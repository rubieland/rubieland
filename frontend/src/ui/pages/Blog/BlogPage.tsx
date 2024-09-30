import { useGetAllPosts } from '../../../api/blog/getAllPosts';
import EmptyBlogSection from './components/EmptyBlogSection';
import PageLoader from '../../components/Loader/PageLoader';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import './styles/BlogPage.scss';

const BlogPage = () => {
  const { t } = useTranslation('', { keyPrefix: 'pages.blog' });
  const { data: posts, isLoading } = useGetAllPosts();
  const publishedPosts = posts?.filter((a) => a.isPublished);
  const isBlogEmpty = !publishedPosts || publishedPosts.length === 0;

  if (isLoading) return <PageLoader isLoading={isLoading} />;

  return (
    <div className="blog-page-main-container">
      <h2 className="main-title">{t('title')}</h2>
      {isBlogEmpty ? (
        <EmptyBlogSection />
      ) : (
        <div>
          <h3>{t('allPosts')}</h3>
          <ul>
            {publishedPosts.map((post, i) => (
              <li key={i}>
                <Link to="/blog/posts/$postId" params={{ postId: post.id }}>
                  Article {i + 1} -{' '}
                  {t('postedOn', { date: new Date(post.createdAt) })}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
