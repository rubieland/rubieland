import happyDogMediumImg from '@/assets/illustrations/happy_dog_medium.jpg';
import happyDogLargeImg from '@/assets/illustrations/happy_dog_large.jpg';
import ResponsiveImage from '@/ui/components/Image/ResponsiveImage';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import '../styles/PresentationSection.scss';

const imageSources = [
  { media: '(min-width: 580px)', srcSet: happyDogLargeImg },
];

const PresentationSection = () => {
  const { t } = useTranslation();

  return (
    <section className="presentation-section">
      <div className="presentation-content">
        <div className="text-column">
          <h2>{t('pages.home.presentation.title')}</h2>
          <p>{t('pages.home.presentation.firstDesc')}</p>
          <p>{t('pages.home.presentation.secondDesc')}</p>
          <Link className="read-more-btn btn btn-primary" to="/about">
            {t('common.readMore')}
          </Link>
        </div>

        <div className="image-column">
          <ResponsiveImage
            defaultSrc={happyDogMediumImg}
            srcSet={imageSources}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default PresentationSection;
