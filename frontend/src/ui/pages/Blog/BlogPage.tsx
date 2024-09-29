import { Link } from '@tanstack/react-router';

const BlogPage = () => {
  return (
    <div>
      <p>BlogPage</p>
      <Link to="/blog/articles/$articleId" params={{ articleId: '123' }}>
        Go to article 123
      </Link>
    </div>
  );
};

export default BlogPage;
