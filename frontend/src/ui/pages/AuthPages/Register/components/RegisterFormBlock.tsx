import useRegister from '../hooks/useRegister';
import i18n from '../../../../../core/i18n';
import RegisterForm from './RegisterForm';
import '../../styles/AuthForms.scss';

const RegisterFormBlock = () => {
  const { onSubmit } = useRegister();

  return (
    <section className="auth-form-container">
      <h2>{i18n.t('pages.register.registerFormBlock.title')}</h2>
      <RegisterForm onSubmit={onSubmit} />
    </section>
  );
};

export default RegisterFormBlock;
