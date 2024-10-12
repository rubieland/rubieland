import PresentationSection from './components/PresentationSection';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Banner from './components/Banner';
import './styles/HomePage.scss';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-main-container">
      <Helmet>
        <title>{t('SEO.home.title')}</title>
        <meta name="description" content={t('SEO.home.description')} />
      </Helmet>
      <Banner />
      <PresentationSection />
    </div>
  );
};

export default Home;
