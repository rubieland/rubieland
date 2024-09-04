import NotRegisteredYetBlock from './components/NotRegisteredYetBlock';
import Separator from '../../../components/Separator/Separator';
import colors from '../../../../assets/styles/colors';
import LoginBlock from './components/LoginBlock';
import '../styles/AuthPages.scss';

const LoginPage = () => {
  return (
    <div className="auth-page-main-container">
      <LoginBlock />
      <div className="separator-container">
        <Separator backgroundColor={colors.grey40} />
      </div>
      <NotRegisteredYetBlock />
    </div>
  );
};

export default LoginPage;
