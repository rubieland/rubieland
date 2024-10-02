import colors from '../../../assets/styles/colors';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import './styles/AuthLinksBlock.scss';
import { memo } from 'react';

const activeProps = {
  style: {
    borderColor: colors.primary,
    color: colors.primary,
    fontWeight: 600,
  },
};

interface AuthLinksBlockProps {
  hideMenu: () => void;
}

const AuthLinksBlock = memo(function ({ hideMenu }: AuthLinksBlockProps) {
  const { t } = useTranslation();

  const hideMenuOnKeyDown = (e: React.KeyboardEvent<'a'>) => {
    if (['Enter', 'Escape'].includes(e.key)) {
      hideMenu();
    }
  };

  return (
    <div className="navbar-auth-links-container">
      <Link
        className="navbar-link nav-login-link"
        onKeyDown={hideMenuOnKeyDown}
        activeProps={activeProps}
        onClick={hideMenu}
        to="/login"
      >
        {t('nav.login')}
      </Link>
      <Link
        className="navbar-link nav-register-link"
        onKeyDown={hideMenuOnKeyDown}
        activeProps={activeProps}
        onClick={hideMenu}
        to="/register"
      >
        {t('nav.register')}
      </Link>
    </div>
  );
});

export default AuthLinksBlock;
