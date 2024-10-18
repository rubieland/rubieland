import colors from '../../../assets/styles/colors';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import Logo from '../Logo/Logo';
import { memo } from 'react';
import './AppLogo.scss';

// its parent (Header) is re-rendered many times, so we use memo to prevent re-rendering of this component
const AppLogo = memo(() => {
  const { t } = useTranslation('translation', { keyPrefix: 'aria-labels' });

  return (
    <div className="app-logo-container">
      <Link to="/" aria-label={t('app-logo')} role="link">
        <Logo color={colors.primary} />
      </Link>
    </div>
  );
});

export default AppLogo;
