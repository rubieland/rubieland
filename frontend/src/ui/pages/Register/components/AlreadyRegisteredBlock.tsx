import CustomButton from '../../../components/Button/CustomButton';
import { useNavigate } from '@tanstack/react-router';
import '../styles/AlreadyRegisteredBlock.scss';

const AlreadyRegisteredBlock = () => {
  const navigate = useNavigate({ from: '/register' });
  const navigateToLogin = () => navigate({ to: '/login' });

  return (
    <section className="already-registered-container">
      <h2>Vous avez déjà un compte ?</h2>
      <CustomButton title="Connectez-vous" onClick={navigateToLogin} />
    </section>
  );
};

export default AlreadyRegisteredBlock;
