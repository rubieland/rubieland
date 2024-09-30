import { useNavbarContext } from './providers/NavbarProvider';
import colors from '../../../assets/styles/colors';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import './styles/AuthLinksBlock.scss';

const activeProps = {
  style: {
    borderColor: colors.primary,
    color: colors.primary,
    fontWeight: 600,
  },
};

const AuthLinksBlock = () => {
  const { t } = useTranslation();
  const { hideMenu } = useNavbarContext();

  const hideOnEscapeKeyDown = (e: React.KeyboardEvent<'a'>) => {
    if (e.key === 'Escape') hideMenu();
  };

  return (
    <div className="navbar-auth-links-container">
      <Link
        className="navbar-link nav-login-link"
        onKeyDown={hideOnEscapeKeyDown}
        activeProps={activeProps}
        onClick={hideMenu}
        to="/login"
      >
        {t('nav.login')}
      </Link>
      <Link
        className="navbar-link nav-register-link"
        onKeyDown={hideOnEscapeKeyDown}
        activeProps={activeProps}
        onClick={hideMenu}
        to="/register"
      >
        {t('nav.register')}
      </Link>
    </div>
  );
};

export default AuthLinksBlock;
