import FooterSocialMediaBlock from './FooterSocialMediaBlock';
import { currentYear } from '../../../utils/date.utils';
import i18n from '../../../core/i18n';
import './styles/Footer.scss';

const Footer = () => {
  return (
    <footer>
      <FooterSocialMediaBlock />
      <p className="footer-copyright">
        {i18n.t('footer.copyright', { year: currentYear })}
      </p>
    </footer>
  );
};

export default Footer;
