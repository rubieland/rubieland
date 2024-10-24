import './styles/FooterLegalContentLinks.scss';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

const FooterLegalContentLinks = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'legalContent' });
  return (
    <section className="footer-legal-content-links">
      <Link to="/privacy-policy" className="footer-legal-content-link">
        {t('privacyPolicy')}
      </Link>
      <Link to="/legal-notice" className="footer-legal-content-link">
        {t('legalNotice')}
      </Link>
    </section>
  );
};

export default FooterLegalContentLinks;
