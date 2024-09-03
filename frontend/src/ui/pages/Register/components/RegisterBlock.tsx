import useRegister from '../hooks/useRegister';
import RegisterForm from './RegisterForm';
import i18n from '../../../../core/i18n';
import '../styles/RegisterBlock.scss';

const RegisterBlock = () => {
  const { onSubmit } = useRegister();

  return (
    <section className="register-block-container">
      <h2>{i18n.t('pages.register.registerBlock.title')}</h2>
      <RegisterForm onSubmit={onSubmit} />
    </section>
  );
};

export default RegisterBlock;
