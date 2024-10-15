import { API_BLOG_PICTURES_PATH, API_URL } from '@/core/envConfig';
import defaultAvatar from '@/assets/images/default_avatar.jpg';
import CustomButton from '@/ui/components/Button/CustomButton';
import Separator from '@/ui/components/Separator/Separator';
import LogoutIcon from '@/ui/components/Icons/Logout';
import { useNavigate } from '@tanstack/react-router';
import { useUserInfo } from '@/stores/SessionStore';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import useLogout from '@/hooks/useLogout';
import './styles/ProfilePage.scss';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { logout } = useLogout();
  const user = useUserInfo();
  const navigate = useNavigate();
  const avatar = user?.avatar
    ? `${API_URL}/${API_BLOG_PICTURES_PATH}/${user?.avatar}`
    : defaultAvatar;

  if (!user) {
    navigate({ to: '/login' });
    return null;
  }

  return (
    <div className="profile-page-main-container">
      <Helmet>
        <title>{t('SEO.profile.title')}</title>
        <meta name="description" content={t('SEO.profile.description')} />
      </Helmet>
      <h2>{t('pages.profile.title')}</h2>

      <Separator width={100} />

      <section className="personal-info-section">
        <h3>{t('pages.profile.personalInfo')}</h3>
        <article className="personal-info-content">
          <div className="avatar">
            <img src={avatar} alt="avatar" loading="lazy" />
          </div>
          <div className="username">
            <p>{`${user.firstName} ${user.lastName}`}</p>
          </div>
        </article>
      </section>

      <Separator />

      <section className="account-info-section">
        <h3>{t('pages.profile.accountInfo')}</h3>
        <article className="account-info-content">
          <div className="email">
            <p>{user.email}</p>
          </div>
        </article>
      </section>

      <Separator />

      <div className="logout-button">
        <CustomButton
          icon={<LogoutIcon width={16} height={16} />}
          onClick={() => logout(undefined)}
          title={t('common.logout')}
          iconPosition="right"
          style="error"
          width={20}
          outlined
        />
      </div>
    </div>
  );
};

export default ProfilePage;
