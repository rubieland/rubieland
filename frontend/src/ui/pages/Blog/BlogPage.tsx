import { useGetAllPosts } from '../../../api/blog/getAllPosts';
import PageLoader from '../../components/Loader/PageLoader';
import { Link } from '@tanstack/react-router';

const BlogPage = () => {
  const { data: posts, isLoading } = useGetAllPosts();
  const publishedPosts = posts?.filter((a) => a.isPublished);

  if (isLoading) return <PageLoader isLoading={isLoading} />;

  return (
    <>
      <div>
        <p>BlogPage</p>
        {!publishedPosts || publishedPosts.length === 0 ? (
          <p>Aucun article n'a été publié pour le moment !</p>
        ) : (
          <div style={{ padding: 24 }}>
            <p style={{ fontSize: 20, color: 'rebeccapurple' }}>
              {publishedPosts.length} posts trouvés !
            </p>
            <ul>
              {publishedPosts.map((post, i) => (
                <li key={i}>
                  <Link to="/blog/posts/$postId" params={{ postId: post.id }}>
                    Article {i + 1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;
