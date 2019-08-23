import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.less';
import VerticalNavItem from '../VerticalNavItem';
import { ReactComponent as ACMIcon } from '../../assets/graphics/acm-icon.svg';
import { ReactComponent as DashboardIcon } from '../../assets/graphics/dashboard-icon.svg';
import { ReactComponent as DiscordIcon } from '../../assets/graphics/discord-icon.svg';
import { ReactComponent as LBIcon } from '../../assets/graphics/lb-icon.svg';
import { ReactComponent as ProfileIcon } from '../../assets/graphics/profile-icon.svg';
import { ReactComponent as SwagIcon } from '../../assets/graphics/swag-icon.svg';

export default () => {
  return (
    <div className="sidebar-component">
      <section>
        <h1>Portal</h1>
        <NavLink activeClassName="selected" className="nav-item" to="/dashboard">
          <VerticalNavItem icon={DashboardIcon} link="/dashboard" text="Dashboard" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="/leaderboard">
          <VerticalNavItem icon={LBIcon} text="Leaderboard" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="/profile">
          <VerticalNavItem icon={ProfileIcon} text="Profile" />
        </NavLink>
      </section>

      <section>
        <h1>ACM</h1>
        <NavLink activeClassName="selected" className="nav-item" to="/about">
          <VerticalNavItem icon={ACMIcon} text="About ACM" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="/swag">
          <VerticalNavItem icon={SwagIcon} text="ACM Store" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="https://discord.gg/mK9Zrf4d">
          <VerticalNavItem icon={DiscordIcon} text="Discord" />
        </NavLink>
      </section>
    </div>
  );
};
