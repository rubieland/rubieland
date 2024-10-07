import { useGetAllPostsBackOffice } from '../../../../api/backOffice/blog/getAllPostsBackOffice';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent';
import BackOfficeBlogPageHeader from './components/BackOfficeBlogPageHeader';
import PageLoader from '../../../components/Loader/PageLoader';
import { usePostColumns } from '../hooks/usePostColumns';
import DataTable from '@/ui/components/Table/DataTable';
import './styles/BackOfficeBlogPage.scss';
import { useMemo } from 'react';

const BackOfficeBlogPage = () => {
  const { data: posts, isLoading, error, refetch } = useGetAllPostsBackOffice();
  const postColumns = usePostColumns();
  const columns = useMemo(() => postColumns, []);

  if (isLoading) return <PageLoader isLoading={isLoading} />;
  if (error)
    return <ErrorComponent message={error.message} onRetry={refetch} />;

  return (
    <section className="bo-blog-section">
      <BackOfficeBlogPageHeader />
      <DataTable columns={columns} data={posts ?? []} />
    </section>
  );
};

export default BackOfficeBlogPage;
