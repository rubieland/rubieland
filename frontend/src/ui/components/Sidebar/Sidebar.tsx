import SidebarToggleButton from './SidebarToggleButton';
import { memo, useCallback, useState } from 'react';
import { LinkType } from '../../../types/links';
import SidebarLinkItem from './SidebarLinkItem';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import './styles/Sidebar.scss';

interface SidebarProps {
  links: LinkType[];
}

const Sidebar = memo(({ links }: SidebarProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'backOfficeSidebar',
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const className = classNames('sidebar', {
    hidden: !isOpen,
  });

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const hideSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <aside className={className}>
      <header className="sidebar-header">
        <h3>{t('headerTitle')}</h3>
        <SidebarToggleButton isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
      </header>
      <nav>
        <ul>
          {links.map((link, i) => (
            <SidebarLinkItem key={i} link={link} hideSidebar={hideSidebar} />
          ))}
        </ul>
      </nav>
    </aside>
  );
});

export default Sidebar;
