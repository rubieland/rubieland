import { useNavbarContext } from './providers/NavbarProvider';
import colors from '../../../assets/styles/colors';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import './styles/AuthLinksBlock.scss';
import { handleKeyDownAction } from '../../../utils/keyboard.utils';

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
    handleKeyDownAction({
      e,
      keys: ['Enter', 'Escape'],
      action: hideMenu,
    });
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
