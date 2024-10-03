import SidebarToggleButton from './SidebarToggleButton';
import { memo, useCallback, useState } from 'react';
import { LinkType } from '../../../types/links';
import SidebarLinkItem from './SidebarLinkItem';
import classNames from 'classnames';
import './styles/Sidebar.scss';

interface SidebarProps {
  links: LinkType[];
  title: string;
}

const Sidebar = memo(({ links, title }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const hideSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const sidebarClassName = classNames('sidebar', {
    opened: isOpen,
  });

  const sidebarHeaderClassName = classNames('sidebar-header', {
    opened: isOpen,
  });

  return (
    <aside className={sidebarClassName}>
      <header className={sidebarHeaderClassName}>
        <SidebarToggleButton
          toggleIsOpen={toggleIsOpen}
          hideSidebar={hideSidebar}
          isOpen={isOpen}
        />
        <p className="sidebar-title">{title}</p>
      </header>
      <nav>
        <ul className="sidebar-links-container">
          {links.map((link, i) => (
            <SidebarLinkItem
              hideSidebar={hideSidebar}
              isOpen={isOpen}
              link={link}
              key={i}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
});

export default Sidebar;
