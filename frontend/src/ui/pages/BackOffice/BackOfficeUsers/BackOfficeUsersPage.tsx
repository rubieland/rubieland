import { useGetAllUsers } from '@/api/backOffice/users/getAllUsers';
import PageLoader from '@/ui/components/Loader/PageLoader';
import DataTable from '@/ui/components/Table/DataTable';
import useUserColumns from '../hooks/useUserColumns';
import { useTranslation } from 'react-i18next';
import './styles/BackOfficeUsersPage.scss';
import { useMemo } from 'react';

const BackOfficeUsersPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.users',
  });
  const { data: users, isLoading } = useGetAllUsers();
  const userColumns = useUserColumns();
  const columns = useMemo(() => userColumns, [users]);

  if (isLoading) return <PageLoader isLoading={isLoading} />;

  return (
    <section className="back-office-section">
      <h2>{t('title')}</h2>
      <DataTable columns={columns} data={users ?? []} />
    </section>
  );
};

export default BackOfficeUsersPage;
