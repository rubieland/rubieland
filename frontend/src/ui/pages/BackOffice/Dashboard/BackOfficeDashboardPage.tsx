import { useTranslation } from 'react-i18next';
import './styles/BackOfficeDashboardPage.scss';

const BackOfficeDashboardPage = () => {
  const { t } = useTranslation();

  return (
    <section className="bo-dashboard-section">
      <h2>{t('pages.backOffice.dashboard.title')}</h2>
    </section>
  );
};

export default BackOfficeDashboardPage;
