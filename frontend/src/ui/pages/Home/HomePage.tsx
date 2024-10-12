import ArrowLeft from '../../components/Icons/Arrows/ArrowLeft';
import CustomButton from '../../components/Button/CustomButton';
import { useIsConnected } from '../../../stores/SessionStore';
import useLogout from '../../../hooks/useLogout';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const { t } = useTranslation();
  const isConnected = useIsConnected();
  const { logout } = useLogout();

  return (
    <div>
      <Helmet>
        <title>{t('SEO.home.title')}</title>
        <meta name="description" content={t('SEO.home.description')} />
      </Helmet>
      {isConnected && (
        <CustomButton
          onClick={() => logout(undefined)}
          icon={<ArrowLeft />}
          title="Déconnexion"
          iconStyle="fill"
          style="error"
          width={20}
        />
      )}
    </div>
  );
};

export default Home;
