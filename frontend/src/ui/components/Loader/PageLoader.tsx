import Loader from './Loader';
import './PageLoader.scss';

interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader = ({ isLoading }: PageLoaderProps) => {
  return (
    <div className="page-loader">
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default PageLoader;
