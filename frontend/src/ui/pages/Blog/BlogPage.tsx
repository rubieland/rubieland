import { useGetAllBlogArticles } from '../../../api/blog/getAllBlogArticles';
import PageLoader from '../../components/Loader/PageLoader';
import { Link } from '@tanstack/react-router';

const BlogPage = () => {
  const { data: blogArticles, isLoading } = useGetAllBlogArticles();
  const publishedArticles = blogArticles?.filter((a) => a.isPublished);

  return (
    <>
      <div>
        <p>BlogPage</p>
        {!publishedArticles || publishedArticles.length === 0 ? (
          <p>Aucun article n'a été publié pour le moment !</p>
        ) : (
          <div style={{ padding: 24 }}>
            <p style={{ fontSize: 20, color: 'rebeccapurple' }}>
              {publishedArticles.length} articles trouvés !
            </p>
            <ul>
              {publishedArticles.map((article, i) => (
                <li key={i}>
                  <Link
                    to="/blog/articles/$articleId"
                    params={{ articleId: article.id }}
                  >
                    Article {i + 1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {isLoading && <PageLoader isLoading={isLoading} />}
    </>
  );
};

export default BlogPage;
