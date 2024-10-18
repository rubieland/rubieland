import colors from '../../../assets/styles/colors';
import { LinkType } from '../../../types/links';
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

// we use memo to prevent too many re-renders of the component
const AuthLinksBlock = memo(({ hideMenu }: AuthLinksBlockProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'nav' });

  const authLinks: LinkType[] = [
    {
      title: t('login'),
      to: '/login',
    },
    {
      title: t('register'),
      to: '/register',
    },
  ];

  const hideMenuOnKeyDown = (e: React.KeyboardEvent<'a'>) => {
    if (['Enter', 'Escape'].includes(e.key)) {
      hideMenu();
    }
  };

  return (
    <ul
      className="navbar-auth-links-container"
      aria-label="Auth links"
      role="navigation"
    >
      {authLinks.map((link, i) => (
        <li key={i} className="navbar-link navbar-auth-link">
          <Link
            onKeyDown={hideMenuOnKeyDown}
            activeProps={activeProps}
            onClick={hideMenu}
            to={link.to}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
});

export default AuthLinksBlock;
