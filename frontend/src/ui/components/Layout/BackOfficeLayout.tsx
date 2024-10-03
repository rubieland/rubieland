import { Outlet } from '@tanstack/react-router';
import { LinkType } from '../../../types/links';
import Sidebar from '../Sidebar/Sidebar';

const BackOfficeLayout = () => {
  const links: LinkType[] = [
    {
      title: 'Dashboard',
      to: '/back-office',
    },
    {
      title: 'Users',
      to: '/back-office/blog',
    },
  ];

  return (
    <div className="back-office-layout-container">
      <h2>Welcome on back-office!</h2>
      <Sidebar links={links} />
      <Outlet />
    </div>
  );
};

export default BackOfficeLayout;
