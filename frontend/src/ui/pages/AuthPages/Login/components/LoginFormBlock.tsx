import i18n from '../../../../../core/i18n';
import useLogin from '../hooks/useLogin';
import '../../styles/AuthBlocks.scss';
import LoginForm from './LoginForm';

const LoginFormBlock = () => {
  const { onSubmit } = useLogin();

  return (
    <section className="auth-form-container">
      <h2>{i18n.t('pages.login.loginFormBlock.title')}</h2>
      <LoginForm onSubmit={onSubmit} />
    </section>
  );
};

export default LoginFormBlock;