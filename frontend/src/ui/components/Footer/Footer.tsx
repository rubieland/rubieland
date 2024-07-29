import FooterSocialMediaBlock from './FooterSocialMediaBlock';
import Separator from '../Separator/Separator';
import i18n from '../../../core/i18n';
import './styles/Footer.scss';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <Separator />
      <footer>
        <FooterSocialMediaBlock />
        <p className="footer-copyright">
          {i18n.t('footer.copyright', { year })}
        </p>
      </footer>
    </>
  );
};

export default Footer;
