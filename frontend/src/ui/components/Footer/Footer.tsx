import FooterSocialMediaBlock from './FooterSocialMediaBlock';
import i18n from '../../../core/i18n';
import './styles/Footer.scss';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <FooterSocialMediaBlock />
      <p className="footer-copyright">
      </p>
    </footer>
  );
};

export default Footer;
