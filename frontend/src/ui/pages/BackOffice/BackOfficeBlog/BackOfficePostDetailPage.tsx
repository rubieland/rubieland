import { useParams } from '@tanstack/react-router';

const BackOfficePostDetailPage = () => {
  const { postId } = useParams({ strict: false });
  console.log(postId);

  return (
    <div>
      <p>Post {postId}</p>
    </div>
  );
};

export default BackOfficePostDetailPage;
