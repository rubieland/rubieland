import { Link } from '@tanstack/react-router';
import i18n from '../../../core/i18n';
import './NotFound.scss';

const NotFound = () => {
  return (
    <section className="not-found-container">
      <h2>{i18n.t('notFound.title')}</h2>
      <p>{i18n.t('notFound.content')}</p>
      <Link className="btn btn-primary back-home-btn" to="/">
        {i18n.t('common.goBackToHomepage')}
      </Link>
    </section>
  );
};

export default NotFound;
