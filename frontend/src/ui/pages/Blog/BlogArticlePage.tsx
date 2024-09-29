import { useParams } from '@tanstack/react-router';

const BlogArticlePage = () => {
  const { articleId } = useParams({ strict: false });
  return (
    <div>
      <p>Page of the article {articleId}</p>
    </div>
  );
};

export default BlogArticlePage;
