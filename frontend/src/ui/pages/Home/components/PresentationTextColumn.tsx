import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

const PresentationTextColumn = () => {
  const { t } = useTranslation();

  return (
    <div className="text-column">
      <h2>{t('pages.home.presentation.title')}</h2>
      <p>{t('pages.home.presentation.firstDesc')}</p>
      <p>{t('pages.home.presentation.secondDesc')}</p>
      <Link className="read-more-btn btn btn-primary" to="/about">
        {t('common.readMore')}
      </Link>
    </div>
  );
};

export default PresentationTextColumn;
