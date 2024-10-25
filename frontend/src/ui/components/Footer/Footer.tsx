import FooterLegalContentLinks from './FooterLegalContentLinks';
import FooterSocialMediaBlock from './FooterSocialMediaBlock';
import { currentYear } from '../../../utils/date.utils';
import { useTranslation } from 'react-i18next';
import './styles/Footer.scss';

const Footer = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'footer' });
  return (
    <footer className="app-footer">
      <FooterSocialMediaBlock />
      <FooterLegalContentLinks />
      <p className="footer-copyright">
        {t('copyright', { year: currentYear })}
      </p>
    </footer>
  );
};

export default Footer;
