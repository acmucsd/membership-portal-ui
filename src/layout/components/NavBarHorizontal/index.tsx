import React from 'react';
import { NavLink } from 'react-router-dom';
import { Divider } from 'antd';

import NavTileItem from './NavTileItem';

import { ReactComponent as DashboardIcon } from '../../../assets/icons/dashboard-icon.svg';
import { ReactComponent as DiscordIcon } from '../../../assets/icons/discord-icon.svg';
import { ReactComponent as LBIcon } from '../../../assets/icons/lb-icon.svg';
import { ReactComponent as ProfileIcon } from '../../../assets/icons/profile-icon.svg';
import { ReactComponent as AdminIcon } from '../../../assets/icons/admin-icon.svg';

import './style.less';

interface NavBarHorizontalProps {
  hasAdminAccess: boolean;
}

const NavBarHorizontal: React.FC<NavBarHorizontalProps> = (props) => {
  const { hasAdminAccess } = props;

  return (
    <>
      <nav className="navbar-horizontal">
        <NavLink exact activeClassName="selected" to="/">
          <NavTileItem icon={DashboardIcon} text="Dashboard" />
        </NavLink>
        <NavLink activeClassName="selected" to="/leaderboard">
          <NavTileItem icon={LBIcon} text="Leaderboard" />
        </NavLink>
        <NavLink exact activeClassName="selected" to="/profile">
          <NavTileItem icon={ProfileIcon} text="Profile" />
        </NavLink>
        <NavLink activeClassName="selected" to="/discord">
          <NavTileItem icon={DiscordIcon} text="Discord" />
        </NavLink>
        {hasAdminAccess && (
          <NavLink activeClassName="selected" to="/admin">
            <NavTileItem icon={AdminIcon} text="Admin" />
          </NavLink>
        )}
      </nav>
      <Divider style={{ height: '2px', margin: '0' }} />
    </>
  );
};

export default NavBarHorizontal;
