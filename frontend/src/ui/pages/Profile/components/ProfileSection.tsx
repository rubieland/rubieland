import useUpdateMyPassword from '../hooks/useUpdateMyPassword';
import useUpdateMyProfile from '../hooks/useUpdateMyProfile';
import Separator from '@/ui/components/Separator/Separator';
import PageLoader from '@/ui/components/Loader/PageLoader';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateProfileForm from './UpdateProfileForm';
import { User } from '@/models/user/user.entity';
import { useTranslation } from 'react-i18next';
import '../styles/ProfileSection.scss';

interface ProfileSectionProps {
  existingProfileData: User | null;
}

const ProfileSection = ({ existingProfileData }: ProfileSectionProps) => {
  const { t } = useTranslation();
  const { onSubmit: updateMyProfile, isPending: isProfileUpdatePending } =
    useUpdateMyProfile();
  const { onSubmit: updateMyPassword, isPending: isPasswordUpdatePending } =
    useUpdateMyPassword();
  const isPending = isProfileUpdatePending || isPasswordUpdatePending;

  if (isPending) return <PageLoader isLoading={isPending} />;

  return (
    <div className="profile-section-main-container">
      <h2 className="main-title">{t('pages.profile.profileSection.title')}</h2>
      <div className="profile-section-content">
        <section className="personal-info-section">
          <article className="personal-info-content">
            <h3 className="section-title">
              {t('pages.profile.profileSection.personalInfo')}
            </h3>
            <UpdateProfileForm
              onSubmit={updateMyProfile}
              existingProfileData={existingProfileData}
            />
            <Separator />
            <h3 className="section-title">
              {t('pages.profile.profileSection.updatePassword')}
            </h3>
            <UpdatePasswordForm onSubmit={updateMyPassword} />
          </article>
        </section>
      </div>
    </div>
  );
};

export default ProfileSection;
