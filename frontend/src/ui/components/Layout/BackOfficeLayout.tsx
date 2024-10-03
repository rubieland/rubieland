import { Outlet } from '@tanstack/react-router';
import { LinkType } from '../../../types/links';
import { useTranslation } from 'react-i18next';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Icons/Dashboard';
import Book from '../Icons/Book';
import colors from '../../../assets/styles/colors';

const BackOfficeLayout = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice',
  });
  const links: LinkType[] = [
    {
      title: t('backOfficeSidebar.links.dashboard'),
      to: '/back-office',
      icon: <Dashboard width={32} color={colors.grey80} />,
    },
    {
      title: t('backOfficeSidebar.links.blog'),
      to: '/back-office/blog',
      icon: <Book width={32} stroke={colors.grey80} />,
    },
  ];

  return (
    <div className="back-office-layout-container">
      <h2>Welcome on back-office!</h2>
      <Sidebar links={links} title={t('backOfficeSidebar.headerTitle')} />
      <Outlet />
    </div>
  );
};

export default BackOfficeLayout;
