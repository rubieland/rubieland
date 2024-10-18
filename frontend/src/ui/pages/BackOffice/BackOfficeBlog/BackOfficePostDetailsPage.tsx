import { useParams } from '@tanstack/react-router';

const BackOfficePostDetailsPage = () => {
  const { postId } = useParams({ strict: false });

  return (
    <div>
      <p>Post {postId}</p>
    </div>
  );
};

export default BackOfficePostDetailsPage;
