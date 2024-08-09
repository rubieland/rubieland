import { SocialMediaLinks } from '../../../enums/SocialMediaLinks';
import './styles/FooterSocialMediaBlock.scss';
import Instagram from '../Icons/Instagram';
import Facebook from '../Icons/Facebook';
import i18n from '../../../core/i18n';

const FooterSocialMediaBlock = () => {
  return (
    <section className="footer-social-media-container">
      <div className="footer-social-media-title">
        <h3>{i18n.t('footer.socialMedia')}</h3>
      </div>
      <div className="footer-social-media-icons-container">
        <a
          aria-label={i18n.t('aria-labels.facebook-icon')}
          className="footer-social-media-icon"
          href={SocialMediaLinks.FACEBOOK}
          target="_blank"
          role="link"
        >
          <Facebook />
        </a>
        <a
          aria-label={i18n.t('aria-labels.instagram-icon')}
          className="footer-social-media-icon"
          href={SocialMediaLinks.INSTAGRAM}
          target="_blank"
          role="link"
        >
          <Instagram />
        </a>
      </div>
    </section>
  );
};

export default FooterSocialMediaBlock;
