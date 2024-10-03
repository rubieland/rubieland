import { useIsAdmin } from '../../../stores/SessionStore';
import colors from '../../../assets/styles/colors';
import { LinkType } from '../../../types/links';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import NavbarItem from './NavbarItem';
import { memo } from 'react';

interface MainLinksBlockProps {
  isConnected: boolean;
  hideMenu: () => void;
}

const activeProps = {
  style: {
    color: colors.primary,
    fontWeight: 600,
  },
};

// we use memo to prevent too many re-renders of the component
const MainLinksBlock = memo(
  ({ isConnected, hideMenu }: MainLinksBlockProps) => {
    const { t } = useTranslation('translation', { keyPrefix: 'nav' });
    const isAdmin = useIsAdmin();

    const mainLinks: LinkType[] = [
      {
        title: t('home'),
        to: '/',
      },
      {
        title: t('about'),
        to: '/about',
      },
      {
        title: t('blog'),
        to: '/blog',
      },
    ];

    return (
      <>
        {mainLinks.map((link, i) => (
          <NavbarItem key={i} link={link} hideMenu={hideMenu} />
        ))}

        {isConnected && (
          <Link
            activeProps={activeProps}
            className="navbar-link"
            onClick={hideMenu}
            to="/profile"
          >
            {t('profile')}
          </Link>
        )}

        {isConnected && isAdmin && (
          <Link
            activeProps={activeProps}
            className="navbar-link"
            onClick={hideMenu}
            to="/back-office"
          >
            {t('backOffice')}
          </Link>
        )}
      </>
    );
  },
);

export default MainLinksBlock;
