import NotRegisteredYetBlock from './components/NotRegisteredYetBlock';
import Separator from '../../../components/Separator/Separator';
import PageLoader from '../../../components/Loader/PageLoader';
import LoginFormBlock from './components/LoginFormBlock';
import colors from '../../../../assets/styles/colors';
import { useTranslation } from 'react-i18next';
import useLogin from './hooks/useLogin';
import '../styles/AuthPages.scss';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
  const { t } = useTranslation();
  const { isPending } = useLogin();

  return (
    <>
      <Helmet>
        <title>{t('SEO.login.title')}</title>
        <meta name="description" content={t('SEO.login.description')} />
      </Helmet>
      <div className="auth-page-main-container">
        <LoginFormBlock />
        <div className="separator-container">
          <Separator backgroundColor={colors.grey40} />
        </div>
        <NotRegisteredYetBlock />
      </div>
      {isPending && <PageLoader isLoading={isPending} />}
    </>
  );
};

export default LoginPage;
