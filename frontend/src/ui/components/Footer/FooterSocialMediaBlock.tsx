import { SocialMediaLinks } from '../../../enums/SocialMediaLinks';
import './styles/FooterSocialMediaBlock.scss';
import Instagram from '../Icons/Instagram';
import Facebook from '../Icons/Facebook';
import i18n from '../../../core/i18n';

const FooterSocialMediaBlock = () => {
  return (
    <div className="footer-social-media-container">
      <div className="footer-social-media-title">
        <h3>{i18n.t('footer.socialMedia')}</h3>
      </div>
      <div className="footer-social-media-icons-container">
        <a
          className="footer-social-media-icon"
          href={SocialMediaLinks.FACEBOOK}
          aria-label="facebook-icon"
          target="_blank"
        >
          <Facebook />
        </a>
        <a
          className="footer-social-media-icon"
          href={SocialMediaLinks.INSTAGRAM}
          aria-label="instagram-icon"
          target="_blank"
        >
          <Instagram />
        </a>
      </div>
    </div>
  );
};

export default FooterSocialMediaBlock;
