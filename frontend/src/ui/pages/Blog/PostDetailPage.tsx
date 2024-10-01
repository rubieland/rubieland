import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import { useGetPostDetail } from '../../../api/blog/getPostDetail';
import { Navigate, useParams } from '@tanstack/react-router';
import PageLoader from '../../components/Loader/PageLoader';
import { useIsAdmin } from '../../../stores/SessionStore';
import { useTranslation } from 'react-i18next';

const PostDetailPage = () => {
  const { t } = useTranslation();
  const { postId } = useParams({ from: '/blog/posts/$postId' });
  const isAdmin = useIsAdmin();

  const {
    data: post,
    isLoading,
    error,
    refetch,
  } = useGetPostDetail({
    postId,
  });

  if (isLoading) return <PageLoader isLoading={isLoading} />;

  if (!post)
    return (
      <ErrorComponent message={t('notFound.content')} showRedirectButton />
    );

  if (error)
    return <ErrorComponent message={error.message} onRetry={() => refetch()} />;

  // check if the post is published and if the user is admin. If not, redirect user because he should not be able to see the post
  if (!post?.isPublished && !isAdmin) return <Navigate to="/blog" />;

  return <div>{post && <p>{post.title}</p>}</div>;
};

export default PostDetailPage;
