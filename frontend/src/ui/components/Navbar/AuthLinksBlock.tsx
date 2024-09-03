import { useNavbarContext } from './providers/NavbarProvider';
import colors from '../../../assets/styles/colors';
import { Link } from '@tanstack/react-router';
import i18n from '../../../core/i18n';
import './styles/AuthLinksBlock.scss';

const activeProps = {
  style: {
    borderColor: colors.primary,
    color: colors.primary,
    fontWeight: 600,
  },
};

const AuthLinksBlock = () => {
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
        {i18n.t('nav.login')}
      </Link>
      <Link
        className="navbar-link nav-register-link"
        onKeyDown={hideOnEscapeKeyDown}
        activeProps={activeProps}
        onClick={hideMenu}
        to="/register"
      >
        {i18n.t('nav.register')}
      </Link>
    </div>
  );
};

export default AuthLinksBlock;
