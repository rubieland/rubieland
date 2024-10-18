import { API_BLOG_PICTURES_PATH, API_URL } from '@/core/envConfig';
import defaultAvatar from '@/assets/images/default_avatar.jpg';
import { User } from '@/models/user/user.entity';
import { useTranslation } from 'react-i18next';
import '../styles/ProfileSection.scss';

interface ProfileSectionProps {
  user: User;
}

const ProfileSection = ({ user }: ProfileSectionProps) => {
  const { t } = useTranslation();
  const avatar = user?.avatar
    ? `${API_URL}/${API_BLOG_PICTURES_PATH}/${user?.avatar}`
    : defaultAvatar;

  return (
    <div className="profile-section-main-container">
      <h2 className="main-title">{t('pages.profile.profileSection.title')}</h2>
      <div className="profile-section-content">
        <section className="personal-info-section">
          <article className="personal-info-content">
            <div className="avatar">
              <img src={avatar} alt="avatar" loading="lazy" />
            </div>
            <div className="username">
              <p>{`${user.firstName} ${user.lastName}`}</p>
            </div>
          </article>
        </section>

        {/* <section className="account-info-section">
          <article className="account-info-content">
            <div className="email">
              <p>{user.email}</p>
            </div>
          </article>
        </section> */}
      </div>
    </div>
  );
};

export default ProfileSection;
