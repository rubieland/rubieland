import useRegister from '../hooks/useRegister';
import i18n from '../../../../../core/i18n';
import RegisterForm from './RegisterForm';
import '../../styles/AuthForms.scss';

const RegisterBlock = () => {
  const { onSubmit } = useRegister();

  return (
    <section className="auth-form-container">
      <h2>{i18n.t('pages.register.registerBlock.title')}</h2>
      <RegisterForm onSubmit={onSubmit} />
    </section>
  );
};

export default RegisterBlock;
