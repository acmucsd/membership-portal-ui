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
  isAdmin: boolean;
}

const NavBarHorizontal: React.FC<NavBarHorizontalProps> = (props) => {
  const { isAdmin } = props;

  return (
    <>
      <nav className="navbar-horizontal">
        <NavLink exact activeClassName="selected" to="/">
          <NavTileItem icon={DashboardIcon} />
        </NavLink>
        <NavLink activeClassName="selected" to="/leaderboard">
          <NavTileItem icon={LBIcon} />
        </NavLink>
        <NavLink exact activeClassName="selected" to="/profile">
          <NavTileItem icon={ProfileIcon} />
        </NavLink>
        <NavLink activeClassName="selected" to="/discord">
          <NavTileItem icon={DiscordIcon} />
        </NavLink>
        {isAdmin && (
          <NavLink activeClassName="selected" to="/admin">
            <NavTileItem icon={AdminIcon} />
          </NavLink>
        )}
      </nav>
      <Divider style={{ height: '2px', margin: '0' }} />
    </>
  );
};

export default NavBarHorizontal;
