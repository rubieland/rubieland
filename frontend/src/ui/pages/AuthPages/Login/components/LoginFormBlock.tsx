import { useTranslation } from 'react-i18next';
import useLogin from '../hooks/useLogin';
import '../../styles/AuthBlocks.scss';
import LoginForm from './LoginForm';

const LoginFormBlock = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.login.loginFormBlock',
  });
  const { onSubmit } = useLogin();

  return (
    <section className="auth-form-container">
      <h2>{t('title')}</h2>
      <LoginForm onSubmit={onSubmit} />
    </section>
  );
};

export default LoginFormBlock;
