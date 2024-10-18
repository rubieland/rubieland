import CustomButton from '@/ui/components/Button/CustomButton';
import PageLoader from '@/ui/components/Loader/PageLoader';
import SettingsSection from './components/SettingsSection';
import ProfileSection from './components/ProfileSection';
import LogoutIcon from '@/ui/components/Icons/Logout';
import { useNavigate } from '@tanstack/react-router';
import { useUserInfo } from '@/stores/SessionStore';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import useLogout from '@/hooks/useLogout';
import './styles/ProfilePage.scss';

const ProfilePage = () => {
  const { t } = useTranslation();
  const user = useUserInfo();
  const navigate = useNavigate();
  const { handleLogout, isPending } = useLogout();

  if (!user) return navigate({ to: '/login' });

  if (isPending) return <PageLoader isLoading={isPending} />;

  // TODO: add logout modal to ask user for confirmation before logging out

  return (
    <div className="profile-page-main-container">
      <Helmet>
        <title>{t('SEO.profile.title')}</title>
        <meta name="description" content={t('SEO.profile.description')} />
      </Helmet>
      <ProfileSection user={user} />
      <SettingsSection />
      <div className="logout-button">
        <CustomButton
          icon={<LogoutIcon width={16} height={16} />}
          onClick={handleLogout}
          title={t('common.logout')}
          iconPosition="right"
          style="error"
          outlined
        />
      </div>
    </div>
  );
};

export default ProfilePage;
