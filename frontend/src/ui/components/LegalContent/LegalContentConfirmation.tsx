import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import './LegalContentConfirmation.scss';

const LegalContentConfirmation = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'legalContent' });
  return (
    <div className="form-input">
      <span className="legal-content-confirm-message">
        {t('formSubmitConfirmation')}
        <Link to="/privacy-policy" className="footer-legal-content-link">
          {t('privacyPolicy')}
        </Link>
        {t('and')}
        <Link to="/legal-notice" className="footer-legal-content-link">
          {t('legalNotice')}
        </Link>
      </span>
    </div>
  );
};

export default LegalContentConfirmation;
