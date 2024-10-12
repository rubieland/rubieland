import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import '../../styles/AuthBlocks.scss';

const NotRegisteredYetBlock = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.login.notRegisteredYetBlock',
  });

  return (
    <section className="auth-link-container">
      <p>{t('title')} </p>
      <Link className="auth-link" to="/register">
        {t('linkTitle')}
      </Link>
    </section>
  );
};

export default NotRegisteredYetBlock;
