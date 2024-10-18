import colors from '../../../assets/styles/colors';
import BeatLoader from 'react-spinners/BeatLoader';

interface LoaderProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <div>
      <BeatLoader
        aria-label="Loading Spinner"
        color={colors.white}
        data-testid="loader"
        loading={isLoading}
        size={40}
      />
    </div>
  );
};

export default Loader;
