import { useGetPostDetail } from '../../../api/blog/getPostDetail';
import PageLoader from '../../components/Loader/PageLoader';
import { useParams } from '@tanstack/react-router';

const PostPage = () => {
  const { postId } = useParams({ from: '/blog/posts/$postId' });

  const { data: post, isLoading } = useGetPostDetail({
    postId,
  });

  if (isLoading) return <PageLoader isLoading={isLoading} />;

  return <div>{post && <p>{post.title}</p>}</div>;
};

export default PostPage;
