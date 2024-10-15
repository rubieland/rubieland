import CustomButton from '@/ui/components/Button/CustomButton';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

const HeroImageContent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate({ from: '/', to: '/about' });
  };

  return (
    <div className="hero-image-content">
      <h1>{t('pages.home.heroImage.heroImageTitle')}</h1>
      <p>{t('pages.home.heroImage.heroImageText')}</p>
      <CustomButton
        title={t('pages.home.heroImage.heroImageCTA')}
        onClick={handleNavigate}
      />
    </div>
  );
};

export default HeroImageContent;
