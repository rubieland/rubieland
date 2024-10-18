import { useTranslation } from 'react-i18next';

const PrestationsSection = () => {
  const { t } = useTranslation();

  // TODO: get prestations from api and create a list of prestations

  return (
    <section className="about-section">
      <h3>{t('pages.about.sections.prestations.title')}</h3>
      <div className="about-section-content">
        <p>{t('pages.about.sections.prestations.content.fullDay')}</p>
        <p>{t('pages.about.sections.prestations.content.halfDay')}</p>
      </div>
    </section>
  );
};

export default PrestationsSection;
