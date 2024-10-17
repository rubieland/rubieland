import { useGetAllPostsBackOffice } from '../../../../api/backOffice/blog/getAllPostsBackOffice';
import BackOfficeBlogPageHeader from './components/BackOfficeBlogPageHeader';
import PageLoader from '../../../components/Loader/PageLoader';
import { usePostColumns } from '../hooks/usePostColumns';
import DataTable from '@/ui/components/Table/DataTable';
import './styles/BackOfficeBlogPage.scss';
import { useMemo } from 'react';

const BackOfficeBlogPage = () => {
  const { data: posts, isLoading } = useGetAllPostsBackOffice();
  const postColumns = usePostColumns();
  const columns = useMemo(() => postColumns, []);

  if (isLoading) return <PageLoader isLoading={isLoading} />;

  // TODO: add pagination when InfiniteQuery is implemented

  return (
    <section className="bo-blog-section">
      <BackOfficeBlogPageHeader />
      <DataTable columns={columns} data={posts ?? []} />
    </section>
  );
};

export default BackOfficeBlogPage;
