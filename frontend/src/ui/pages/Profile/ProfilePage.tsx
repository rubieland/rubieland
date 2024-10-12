import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import './styles/ProfilePage.scss';

const ProfilePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>{t('SEO.profile.title')}</title>
        <meta name="description" content={t('SEO.profile.description')} />
      </Helmet>
      <p>ProfilePage</p>
    </div>
  );
};

export default ProfilePage;
