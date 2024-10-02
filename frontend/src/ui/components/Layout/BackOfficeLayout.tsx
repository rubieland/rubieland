import { Outlet } from '@tanstack/react-router';

const BackOfficeLayout = () => {
  return (
    <div className="back-office-layout-container">
      <h2>Welcome on back-office!</h2>
      <Outlet />
    </div>
  );
};

export default BackOfficeLayout;
