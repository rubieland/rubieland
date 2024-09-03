import useRegister from '../hooks/useRegister';
import RegisterForm from './RegisterForm';
import '../styles/RegisterBlock.scss';

const RegisterBlock = () => {
  const { onSubmit } = useRegister();

  return (
    <section className="register-block-container">
      <h2>Pas encore de compte ? Inscrivez-vous</h2>
      <RegisterForm onSubmit={onSubmit} />
    </section>
  );
};

export default RegisterBlock;
