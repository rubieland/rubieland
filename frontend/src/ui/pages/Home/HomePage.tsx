import ArrowLeft from '../../components/Icons/Arrows/ArrowLeft';
import CustomButton from '../../components/Button/CustomButton';
import { useIsConnected } from '../../../stores/SessionStore';
import useLogout from '../../../hooks/useLogout';

const Home = () => {
  const isConnected = useIsConnected();
  const { logout } = useLogout();

  return (
    <div>
      {isConnected && (
        <CustomButton
          onClick={() => logout(undefined)}
          icon={<ArrowLeft />}
          title="Déconnexion"
          iconStyle="fill"
          style="error"
          width={20}
        />
      )}
    </div>
  );
};

export default Home;
