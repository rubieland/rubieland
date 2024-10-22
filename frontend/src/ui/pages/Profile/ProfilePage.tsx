import Separator from '@/ui/components/Separator/Separator';
import SettingsSection from './components/SettingsSection';
import ProfileSection from './components/ProfileSection';
import LogoutSection from './components/LogoutSection';
import { useNavigate } from '@tanstack/react-router';
import { useUserInfo } from '@/stores/SessionStore';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import './styles/ProfilePage.scss';

const ProfilePage = () => {
  const { t } = useTranslation();
  const user = useUserInfo();
  const navigate = useNavigate();

  if (!user) return navigate({ to: '/login' });

  return (
    <div className="profile-page-main-container">
      <Helmet>
        <title>{t('SEO.profile.title')}</title>
        <meta name="description" content={t('SEO.profile.description')} />
      </Helmet>

      <ProfileSection existingProfileData={user} />
      <SettingsSection />
      <Separator />
      <LogoutSection />
    </div>
  );
};

export default ProfilePage;
