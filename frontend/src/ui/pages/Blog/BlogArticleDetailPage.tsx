import { useGetBlogArticleDetail } from '../../../api/blog/getBlogArticleDetail';
import PageLoader from '../../components/Loader/PageLoader';
import { useParams } from '@tanstack/react-router';

const BlogArticlePage = () => {
  const { articleId } = useParams({ from: '/blog/articles/$articleId' });

  const { data: blogArticle, isLoading } = useGetBlogArticleDetail({
    articleId,
  });

  if (isLoading) return <PageLoader isLoading={isLoading} />;

  return <div>{blogArticle && <p>{blogArticle.title}</p>}</div>;
};

export default BlogArticlePage;
