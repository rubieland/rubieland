import { useNavigate } from '@tanstack/react-router';
import CustomButton from '../Button/CustomButton';
import { useTranslation } from 'react-i18next';
import './ErrorComponent.scss';

interface ErrorComponentProps {
  showRedirectButton?: boolean;
  onRetry?: () => void;
  message: string;
}

const ErrorComponent = ({
  message,
  onRetry,
  showRedirectButton,
}: ErrorComponentProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });
  const navigate = useNavigate();

  const navigateToHomepage = () => {
    navigate({ to: '/' });
  };

  return (
    <section className="error-component-section">
      <div className="error-box">
        <h2>{t('error')}</h2>
        <p>{message}</p>
        {onRetry && (
          <CustomButton
            onClick={onRetry}
            title={t('retry')}
            style="secondary"
          />
        )}
        {showRedirectButton && (
          <CustomButton
            title={t('goBackToHomepage')}
            onClick={navigateToHomepage}
            style="secondary"
          />
        )}
      </div>
    </section>
  );
};

export default ErrorComponent;
