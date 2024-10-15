import mediumBannerImg from '@/assets/illustrations/banner_medium.jpg';
import largeBannerImg from '@/assets/illustrations/banner_large.jpg';
import ResponsiveImage from '@/ui/components/Image/ResponsiveImage';
import CustomButton from '@/ui/components/Button/CustomButton';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import '../styles/Banner.scss';

const imageSources = [{ media: '(min-width: 768px)', srcSet: largeBannerImg }];

const Banner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate({ from: '/', to: '/about' });
  };

  return (
    <section className="banner">
      <ResponsiveImage
        defaultSrc={mediumBannerImg}
        srcSet={imageSources}
        alt={t('pages.home.banner.bannerImgAlt')}
      />
      <div className="banner-content">
        <h1>{t('pages.home.banner.bannerTitle')}</h1>
        <p>{t('pages.home.banner.bannerText')}</p>
        <CustomButton
          title={t('pages.home.banner.bannerCTA')}
          onClick={handleNavigate}
        />
      </div>
    </section>
  );
};

export default Banner;
