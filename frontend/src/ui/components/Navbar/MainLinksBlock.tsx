import { useIsAdmin } from '../../../stores/SessionStore';
import colors from '../../../assets/styles/colors';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { memo, useMemo } from 'react';
import NavbarItem from './NavbarItem';

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

    // we use useMemo to prevent re-creating the mainLinks array on every render
    const mainLinks = useMemo(
      () => [
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
      ],
      [t],
    );

    return (
      <>
        {mainLinks.map(({ title, to }) => (
          <NavbarItem key={to} title={title} to={to} hideMenu={hideMenu} />
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
