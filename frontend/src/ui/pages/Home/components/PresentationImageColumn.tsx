import happyDogMediumImg from '@/assets/illustrations/happy_dog_medium.jpg';
import happyDogLargeImg from '@/assets/illustrations/happy_dog_large.jpg';
import ResponsiveImage from '@/ui/components/Image/ResponsiveImage';
import { useTranslation } from 'react-i18next';

const imageSources = [
  { media: '(min-width: 580px)', srcSet: happyDogLargeImg },
];

const PresentationImageColumn = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.home.presentation',
  });

  return (
    <div className="image-column">
      <ResponsiveImage
        defaultSrc={happyDogMediumImg}
        srcSet={imageSources}
        alt={t('imageAlt')}
      />
    </div>
  );
};

export default PresentationImageColumn;
