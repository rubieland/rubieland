import { useNavigate } from '@tanstack/react-router';
import { LinkType } from '../../../types/links';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import classNames from 'classnames';

interface SidebarLinkItemProps {
  hideSidebar: () => void;
  isOpen: boolean;
  link: LinkType;
}

const SidebarLinkItem = memo(
  ({ hideSidebar, isOpen, link }: SidebarLinkItemProps) => {
    const { t } = useTranslation('translation', { keyPrefix: 'aria-labels' });
    const navigate = useNavigate();

    // TODO: fix active style not working on nested routes
    const className = classNames('sidebar-link', {
      opened: isOpen,
      active: window.location.pathname === link.to,
    });

    const handleClick = useCallback(() => {
      hideSidebar();
      navigate({ to: link.to });
    }, [hideSidebar, navigate, link.to]);

    const toggleMenuOnKeyDown = useCallback(
      () => (e: React.KeyboardEvent) => {
        if (e.key === ' ') e.preventDefault();
        else if (e.key === 'Enter') {
          handleClick();
        } else if (e.key === 'Escape') {
          hideSidebar();
        }
      },
      [handleClick, hideSidebar],
    );

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
  },
);

export default SidebarLinkItem;
