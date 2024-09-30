import { Link } from '@tanstack/react-router';

const BackOfficeBlogPage = () => {
  return (
    <div>
      <p>BackOfficeBlogPage</p>
      <Link
        to="/back-office/blog/posts/$postId"
        params={{ postId: 'abcd1234' }}
      >
        Go to post abcd1234
      </Link>
    </div>
  );
};

export default BackOfficeBlogPage;
