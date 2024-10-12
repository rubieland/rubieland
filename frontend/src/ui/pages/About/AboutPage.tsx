import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>{t('SEO.about.title')}</title>
        <meta name="description" content={t('SEO.about.description')} />
      </Helmet>
      <p>AboutPage</p>
    </div>
  );
};

export default AboutPage;
