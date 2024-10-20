import useUpdateMyProfile from '../hooks/useUpdateMyProfile';
import PageLoader from '@/ui/components/Loader/PageLoader';
import UpdateProfileForm from './UpdateProfileForm';
import { User } from '@/models/user/user.entity';
import { useTranslation } from 'react-i18next';
import '../styles/ProfileSection.scss';

interface ProfileSectionProps {
  existingProfileData: User | null;
}

const ProfileSection = ({ existingProfileData }: ProfileSectionProps) => {
  const { t } = useTranslation();
  const { onSubmit, isPending } = useUpdateMyProfile();

  if (isPending) return <PageLoader isLoading={isPending} />;

  return (
    <div className="profile-section-main-container">
      <h2 className="main-title">{t('pages.profile.profileSection.title')}</h2>
      <div className="profile-section-content">
        <section className="personal-info-section">
          <article className="personal-info-content">
            <UpdateProfileForm
              onSubmit={onSubmit}
              existingProfileData={existingProfileData}
            />
          </article>
        </section>
      </div>
    </div>
  );
};

export default ProfileSection;
