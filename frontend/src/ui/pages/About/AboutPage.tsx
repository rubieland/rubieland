import PrestationsSection from './components/PrestationsSection';
import AboutSection from './components/AboutSection';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import './AboutPage.scss';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="about-main-container">
      <Helmet>
        <title>{t('SEO.about.title')}</title>
        <meta name="description" content={t('SEO.about.description')} />
      </Helmet>

      <h2 className="main-title">{t('pages.about.title')}</h2>
      <div className="about-sections-container">
        <AboutSection
          title={t('pages.about.sections.aboutRubieland.title')}
          content={t('pages.about.sections.aboutRubieland.content')}
        />
        <AboutSection
          title={t('pages.about.sections.amenities.title')}
          content={t('pages.about.sections.amenities.content')}
        />
        <AboutSection
          title={t('pages.about.sections.location.title')}
          content={t('pages.about.sections.location.content')}
        />
        <PrestationsSection />
      </div>
    </div>
  );
};

export default AboutPage;
