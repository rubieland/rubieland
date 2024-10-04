import { useGetAllPostsBackOffice } from '../../../../api/backOffice/blog/getAllPostsBackOffice';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent';
import BackOfficePostCard from './components/BackOfficePostCard';
import PageLoader from '../../../components/Loader/PageLoader';
import './styles/BackOfficeBlogPage.scss';

const BackOfficeBlogPage = () => {
  const { data: posts, isLoading, error, refetch } = useGetAllPostsBackOffice();

  if (isLoading) return <PageLoader isLoading={isLoading} />;
  if (error)
    return <ErrorComponent message={error.message} onRetry={() => refetch()} />;

  return (
    <div className="bo-blog-page-main-container">
      <p>BackOfficeBlogPage</p>
      <section className="posts-list">
        {posts &&
          posts.length > 0 &&
          posts.map((post, i) => <BackOfficePostCard post={post} key={i} />)}
      </section>
    </div>
  );
};

export default BackOfficeBlogPage;
