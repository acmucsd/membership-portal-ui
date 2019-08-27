import React from 'react';
import { NavLink } from 'react-router-dom';
import { Divider } from 'antd';

import './style.less';
import NavTileItem from './NavTileItem';
import { ReactComponent as DashboardIcon } from '../../assets/icons/dashboard-icon.svg';
import { ReactComponent as DiscordIcon } from '../../assets/icons/discord-icon.svg';
import { ReactComponent as LBIcon } from '../../assets/icons/lb-icon.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile-icon.svg';

export default () => {
  return (
    <>
      <nav className="navbar-horizontal">
        <NavLink activeClassName="selected" to="/dashboard">
          <NavTileItem icon={DashboardIcon} link="/dashboard" text="Dashboard" />
        </NavLink>
        <NavLink activeClassName="selected" to="/leaderboard">
          <NavTileItem icon={LBIcon} text="Leaderboard" />
        </NavLink>
        <NavLink activeClassName="selected" to="/profile">
          <NavTileItem icon={ProfileIcon} text="Profile" />
        </NavLink>
        <a href="https://discord.gg/mK9Zrf4d">
          <NavTileItem icon={DiscordIcon} text="Discord" />
        </a>
      </nav>
      <Divider style={{ height: '2px', margin: '0' }} />
    </>
  );
};
