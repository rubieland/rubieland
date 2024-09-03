import AlreadyRegisteredBlock from './components/AlreadyRegisteredBlock';
import Separator from '../../components/Separator/Separator';
import RegisterBlock from './components/RegisterBlock';
import colors from '../../../assets/styles/colors';
import './styles/RegisterPage.scss';

const RegisterPage = () => {
  return (
    <div className="register-page-main-container">
      <RegisterBlock />
      <div className="separator-container">
        <Separator backgroundColor={colors.grey40} />
      </div>
      <AlreadyRegisteredBlock />
    </div>
  );
};

export default RegisterPage;
