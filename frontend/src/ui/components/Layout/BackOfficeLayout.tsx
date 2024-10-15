import colors from '../../../assets/styles/colors';
import { Outlet } from '@tanstack/react-router';
import { LinkType } from '../../../types/links';
import DashboardIcon from '../Icons/Dashboard';
import { useTranslation } from 'react-i18next';
import Sidebar from '../Sidebar/Sidebar';
import BookOpen from '../Icons/BookOpen';
import Header from '../Header/Header';

const BackOfficeLayout = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice',
  });

  // TODO: add submenus for nested routes
  // TODO: add logout button

  const links: LinkType[] = [
    {
      title: t('backOfficeSidebar.links.dashboard'),
      to: '/back-office',
      icon: <DashboardIcon width={24} height={24} stroke={colors.grey80} />,
    },
    {
      title: t('backOfficeSidebar.links.blog'),
      to: '/back-office/blog',
      icon: <BookOpen width={24} height={24} stroke={colors.grey80} />,
    },
  ];

  return (
    <div className="back-office-layout-container">
      <Header />
      <main className="back-office-layout-content">
        <Sidebar links={links} title={t('backOfficeSidebar.headerTitle')} />
        <Outlet />
      </main>
    </div>
  );
};

export default BackOfficeLayout;
