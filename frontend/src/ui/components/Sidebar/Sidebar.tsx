import SidebarToggleButton from './SidebarToggleButton';
import SidebarLogoutButton from './SidebarLogoutButton';
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

  const getClassNames = (baseClassName: string) =>
    classNames(baseClassName, {
      opened: isOpen,
    });

  return (
    <aside className={getClassNames('sidebar')}>
      <div className="sidebar-top">
        <header className={getClassNames('sidebar-header')}>
          <SidebarToggleButton
            toggleIsOpen={toggleIsOpen}
            hideSidebar={hideSidebar}
            isOpen={isOpen}
          />
          <p className={getClassNames('sidebar-title')}>{title}</p>
        </header>
        <nav>
          <ul className={getClassNames('sidebar-links-container')}>
            {links.map((link, i) => (
              <SidebarLinkItem
                hideSidebar={hideSidebar}
                isOpen={isOpen}
                link={link}
                key={i}
              />
            ))}
            <SidebarLogoutButton hideSidebar={hideSidebar} isOpen={isOpen} />
          </ul>
        </nav>
      </div>
    </aside>
  );
});

export default Sidebar;
