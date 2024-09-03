import { Link } from '@tanstack/react-router';
import '../styles/AlreadyRegisteredBlock.scss';
import i18n from '../../../../core/i18n';

const AlreadyRegisteredBlock = () => {
  return (
    <section className="already-registered-container">
      <h2>{i18n.t('pages.register.alreadyRegisteredBlock.title')}</h2>
      <Link className="link-to-login" to="/login">
        {i18n.t('pages.register.alreadyRegisteredBlock.linkTitle')}
      </Link>
    </section>
  );
};

export default AlreadyRegisteredBlock;
