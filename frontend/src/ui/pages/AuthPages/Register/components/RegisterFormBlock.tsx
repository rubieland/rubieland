import { useTranslation } from 'react-i18next';
import useRegister from '../hooks/useRegister';
import RegisterForm from './RegisterForm';
import '../../styles/AuthForms.scss';

const RegisterFormBlock = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.register.registerFormBlock',
  });
  const { onSubmit } = useRegister();

  return (
    <section className="auth-form-container">
      <h2>{t('title')}</h2>
      <RegisterForm onSubmit={onSubmit} />
    </section>
  );
};

export default RegisterFormBlock;
