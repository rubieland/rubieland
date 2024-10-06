import { useGetAllPostsBackOffice } from '../../../../api/backOffice/blog/getAllPostsBackOffice';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent';
import PageLoader from '../../../components/Loader/PageLoader';
import { usePostColumns } from '../hooks/usePostColumns';
import DataTable from '@/ui/components/Table/DataTable';
import { useTranslation } from 'react-i18next';
import './styles/BackOfficeBlogPage.scss';
import { useMemo } from 'react';

const BackOfficeBlogPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.blog',
  });
  const { data: posts, isLoading, error, refetch } = useGetAllPostsBackOffice();
  const postColumns = usePostColumns();
  const columns = useMemo(() => postColumns, []);

  if (isLoading) return <PageLoader isLoading={isLoading} />;
  if (error)
    return <ErrorComponent message={error.message} onRetry={refetch} />;

  return (
    <div className="bo-blog-page-main-container">
      <h2>{t('title')}</h2>
      <DataTable columns={columns} data={posts ?? []} />
    </div>
  );
};

export default BackOfficeBlogPage;
