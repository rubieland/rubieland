import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import '../../styles/AuthBlocks.scss';

const AlreadyRegisteredBlock = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.register.alreadyRegisteredBlock',
  });

  return (
    <section className="auth-link-container">
      <p>{t('title')} </p>
      <Link className="auth-link" to="/login">
        {t('linkTitle')}
      </Link>
    </section>
  );
};

export default AlreadyRegisteredBlock;
