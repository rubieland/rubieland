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
        <section className="about-section" id="about-rubieland">
          <h3>{t('pages.about.sections.aboutRubieland.title')}</h3>
          <div className="about-section-content">
            <p>{t('pages.about.sections.aboutRubieland.content')}</p>
          </div>
        </section>

        <section className="about-section" id="amenities">
          <h3>{t('pages.about.sections.facilities.title')}</h3>
          <div className="about-section-content">
            <p>{t('pages.about.sections.facilities.content')}</p>
          </div>
        </section>

        <section className="about-section" id="location">
          <h3>{t('pages.about.sections.location.title')}</h3>
          <div className="about-section-content">
            <p>{t('pages.about.sections.location.content')}</p>
          </div>
        </section>

        <section className="about-section" id="services">
          <h3>{t('pages.about.sections.prestations.title')}</h3>
          <div className="about-section-content">
            <p>{t('pages.about.sections.prestations.content.fullDay')}</p>
            <p>{t('pages.about.sections.prestations.content.halfDay')}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
