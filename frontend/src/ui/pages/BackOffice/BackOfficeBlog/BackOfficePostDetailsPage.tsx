import { useParams } from '@tanstack/react-router';

const BackOfficePostDetailsPage = () => {
  const { postId } = useParams({ strict: false });
  console.log(postId);

  return (
    <div>
      <p>Post {postId}</p>
    </div>
  );
};

export default BackOfficePostDetailsPage;
