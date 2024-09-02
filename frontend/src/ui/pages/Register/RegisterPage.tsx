import RegisterForm from './components/RegisterForm';
import useRegister from './hooks/useRegister';

const RegisterPage = () => {
  const { onSubmit } = useRegister();

  return (
    <div>
      <p>RegisterPage</p>
      <RegisterForm onSubmit={onSubmit} />
    </div>
  );
};

export default RegisterPage;
