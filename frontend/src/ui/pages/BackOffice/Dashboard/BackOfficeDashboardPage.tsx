import UserCreationChart from '@/ui/pages/BackOffice/Dashboard/components/charts/UserCreationChart';
// import { useGetAllUsers } from '@/api/backOffice/users/getAllUsers';
// import PageLoader from '@/ui/components/Loader/PageLoader';
import { groupUsersByMonth } from '@/utils/charts.utils';
import { useUserInfo } from '@/stores/SessionStore';
import { useTranslation } from 'react-i18next';
import './styles/BackOfficeDashboardPage.scss';
import { usersMock } from './mocks';

const BackOfficeDashboardPage = () => {
  const { t } = useTranslation();
  const user = useUserInfo();

  //   const { data: users, isLoading } = useGetAllUsers();

  //   if (isLoading) return <PageLoader isLoading={isLoading} />;

  // TODO: replace usersMock with real data and uncomment previous lines
  const { labels, data } = groupUsersByMonth(usersMock ?? []);

  return (
    <section className="back-office-section">
      <h2>
        {t('pages.backOffice.dashboard.welcome', {
          firstName: user?.firstName,
          lastName: user?.lastName,
        })}
      </h2>
      {/* TODO: this is a temporary chart used as an example, to be replaced with real data, date range picker etc... */}
      <article className="dashboard-chart">
        <h3>{t('pages.backOffice.charts.users.usersCreation.title')}</h3>
        <UserCreationChart labels={labels} data={data} />
      </article>
    </section>
  );
};

export default BackOfficeDashboardPage;
