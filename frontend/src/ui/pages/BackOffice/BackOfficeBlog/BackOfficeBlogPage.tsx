import { Link } from '@tanstack/react-router';

const BackOfficeBlogPage = () => {
  return (
    <div>
      <p>BackOfficeBlogPage</p>
      <Link
        to="/back-office/blog/articles/$articleId"
        params={{ articleId: 'abcd1234' }}
      >
        Go to article abcd1234
      </Link>
    </div>
  );
};

export default BackOfficeBlogPage;
