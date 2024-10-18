import PresentationSection from './components/PresentationSection';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import HeroImage from './components/HeroImage';
import './styles/HomePage.scss';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-main-container">
      <Helmet>
        <title>{t('SEO.home.title')}</title>
        <meta name="description" content={t('SEO.home.description')} />
      </Helmet>
      <HeroImage />
      <PresentationSection />
    </div>
  );
};

export default Home;
