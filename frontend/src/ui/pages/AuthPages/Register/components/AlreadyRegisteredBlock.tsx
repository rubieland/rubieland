import { Link } from '@tanstack/react-router';
import i18n from '../../../../../core/i18n';
import '../../styles/AuthBlocks.scss';

const AlreadyRegisteredBlock = () => {
  return (
    <section className="auth-link-container">
      <p>{i18n.t('pages.register.alreadyRegisteredBlock.title')} </p>
      <Link className="auth-link" to="/login">
        {i18n.t('pages.register.alreadyRegisteredBlock.linkTitle')}
      </Link>
    </section>
  );
};

export default AlreadyRegisteredBlock;
