import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import './NotFound.scss';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <section className="not-found-container">
      <h2>{t('notFound.title')}</h2>
      <p>{t('notFound.content')}</p>
      <Link className="btn btn-primary back-home-btn" to="/">
        {t('common.goBackToHomepage')}
      </Link>
    </section>
  );
};

export default NotFound;
