import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import './styles/ProfilePage.scss';
import useLogout from '@/hooks/useLogout';
import ArrowLeft from '@/ui/components/Icons/Arrows/ArrowLeft';
import CustomButton from '@/ui/components/Button/CustomButton';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { logout } = useLogout();
  return (
    <div>
      <Helmet>
        <title>{t('SEO.profile.title')}</title>
        <meta name="description" content={t('SEO.profile.description')} />
      </Helmet>
      <p>ProfilePage</p>
      <CustomButton
        onClick={() => logout(undefined)}
        icon={<ArrowLeft />}
        title="Déconnexion"
        iconStyle="fill"
        style="error"
        width={20}
      />
    </div>
  );
};

export default ProfilePage;
