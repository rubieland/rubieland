import { SocialMediaLinks } from '../../../enums/SocialMediaLinks';
import { useTranslation } from 'react-i18next';
import './styles/FooterSocialMediaBlock.scss';
import Instagram from '../Icons/Instagram';
import Facebook from '../Icons/Facebook';

const FooterSocialMediaBlock = () => {
  const { t } = useTranslation();

  return (
    <section className="footer-social-media-container">
      <p className="footer-social-media-title">{t('footer.socialMedia')}</p>

      <div className="footer-social-media-icons-container">
        <a
          aria-label={t('aria-labels.facebook-icon')}
          className="footer-social-media-icon"
          href={SocialMediaLinks.FACEBOOK}
          target="_blank"
          role="link"
        >
          <Facebook />
        </a>
        <a
          aria-label={t('aria-labels.instagram-icon')}
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
