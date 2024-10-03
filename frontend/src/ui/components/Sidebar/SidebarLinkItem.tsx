// import './SidebarLinkItem.scss'

import { LinkType } from '../../../types/links';
import { Link } from '@tanstack/react-router';

interface SidebarLinkItemProps {
  hideSidebar: () => void;
  link: LinkType;
}

const SidebarLinkItem = ({ hideSidebar, link }: SidebarLinkItemProps) => {
  return (
    <li className="sidebar-link" onClick={hideSidebar}>
      <Link to={link.to}>{link.title}</Link>
    </li>
  );
};

export default SidebarLinkItem;
