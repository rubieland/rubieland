import mediumHeroImageImg from '@/assets/illustrations/hero_image_medium.jpg';
import largeHeroImageImg from '@/assets/illustrations/hero_image_large.jpg';
import ResponsiveImage from '@/ui/components/Image/ResponsiveImage';
import HeroImageContent from './HeroImageContent';
import { useTranslation } from 'react-i18next';
import '../styles/HeroImage.scss';

const imageSources = [
  { media: '(min-width: 768px)', srcSet: largeHeroImageImg },
];

const HeroImage = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-image">
      <ResponsiveImage
        defaultSrc={mediumHeroImageImg}
        srcSet={imageSources}
        alt={t('pages.home.heroImage.heroImageImgAlt')}
      />
      <HeroImageContent />
    </section>
  );
};

export default HeroImage;
