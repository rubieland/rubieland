import { useNavigate } from '@tanstack/react-router';
import { LinkType } from '../../../types/links';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface SidebarLinkItemProps {
  hideSidebar: () => void;
  isOpen: boolean;
  link: LinkType;
}

const SidebarLinkItem = ({
  hideSidebar,
  isOpen,
  link,
}: SidebarLinkItemProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'aria-labels' });
  const navigate = useNavigate();
  const className = classNames('sidebar-link', {
    opened: isOpen,
    active: window.location.pathname === link.to,
  });

  const handleClick = () => {
    hideSidebar();
    navigate({ to: link.to });
  };

  const toggleMenuOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ') e.preventDefault();
    else if (e.key === 'Enter') {
      handleClick();
    } else if (e.key === 'Escape') {
      hideSidebar();
    }
  };

  return (
    <li
      aria-label={t('linkTo', { page: link.to })}
      onKeyDown={toggleMenuOnKeyDown}
      className={className}
      onClick={handleClick}
      tabIndex={0}
      role="link"
    >
      {link.icon}
      <p>{link.title}</p>
    </li>
  );
};

export default SidebarLinkItem;
