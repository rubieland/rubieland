import { Link } from '@tanstack/react-router';
import i18n from '../../../../../core/i18n';
import '../../styles/AuthBlocks.scss';

const NotRegisteredYetBlock = () => {
  return (
    <section className="auth-link-container">
      <p>{i18n.t('pages.login.notRegisteredYetBlock.title')} </p>
      <Link className="auth-link" to="/register">
        {i18n.t('pages.login.notRegisteredYetBlock.linkTitle')}
      </Link>
    </section>
  );
};

export default NotRegisteredYetBlock;
