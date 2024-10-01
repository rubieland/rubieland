import { useTranslation } from 'react-i18next';
import CustomButton from '../Button/CustomButton';
import './ErrorComponent.scss';

interface ErrorComponentProps {
  onRetry?: () => void;
  message: string;
}

const ErrorComponent = ({ message, onRetry }: ErrorComponentProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });
  return (
    <section className="error-component-section">
      <div className="error-box">
        <h2>{t('error')}</h2>
        <p>{message}</p>
        {onRetry && (
          <CustomButton onClick={onRetry} title={t('retry')} style="error" />
        )}
      </div>
    </section>
  );
};

export default ErrorComponent;
