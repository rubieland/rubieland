import AlreadyRegisteredBlock from './components/AlreadyRegisteredBlock';
import Separator from '../../../components/Separator/Separator';
import RegisterFormBlock from './components/RegisterFormBlock';
import PageLoader from '../../../components/Loader/PageLoader';
import colors from '../../../../assets/styles/colors';
import useRegister from './hooks/useRegister';
import '../styles/AuthPages.scss';

const RegisterPage = () => {
  const { isPending } = useRegister();

  return (
    <>
      <div className="auth-page-main-container">
        <RegisterFormBlock />
        <div className="separator-container">
          <Separator backgroundColor={colors.grey40} />
        </div>
        <AlreadyRegisteredBlock />
      </div>
      {isPending && <PageLoader isLoading={isPending} />}
    </>
  );
};

export default RegisterPage;
