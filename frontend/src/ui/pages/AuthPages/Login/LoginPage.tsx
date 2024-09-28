import NotRegisteredYetBlock from './components/NotRegisteredYetBlock';
import Separator from '../../../components/Separator/Separator';
import PageLoader from '../../../components/Loader/PageLoader';
import LoginFormBlock from './components/LoginFormBlock';
import colors from '../../../../assets/styles/colors';
import useLogin from './hooks/useLogin';
import '../styles/AuthPages.scss';

const LoginPage = () => {
  const { isPending } = useLogin();

  return (
    <>
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
