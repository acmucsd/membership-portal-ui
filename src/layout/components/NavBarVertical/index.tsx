import React, { MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../../auth/authActions';
import { ThunkActionCreator } from '../../../auth/authTypes';

import './style.less';

import NavListItem from '../NavListItem';
import { ReactComponent as ACMIcon } from '../../../assets/icons/acm-icon.svg';
import { ReactComponent as AdminIcon } from '../../../assets/icons/admin-icon.svg';
import { ReactComponent as DashboardIcon } from '../../../assets/icons/dashboard-icon.svg';
import { ReactComponent as DiscordIcon } from '../../../assets/icons/discord-icon.svg';
import { ReactComponent as LBIcon } from '../../../assets/icons/lb-icon.svg';
import { ReactComponent as ProfileIcon } from '../../../assets/icons/profile-icon.svg';
import { ReactComponent as SwagIcon } from '../../../assets/icons/swag-icon.svg';
import { ReactComponent as FeedbackIcon } from '../../../assets/icons/feedback-icon.svg';
import { ReactComponent as LogoutIcon } from '../../../assets/icons/logout-icon.svg';

interface NavbarVerticalProps {
  isAdmin: boolean;
  logout: MouseEventHandler;
}

const NavbarVertical: React.FC<NavbarVerticalProps> = (props) => {
  const { isAdmin, logout } = props;

  return (
    <div className="navbar-vertical-container">
      <div className="padding" />
      <nav className="content">
        <div>
          <h1 className="title">Portal</h1>
          <NavLink exact activeClassName="selected" to="/">
            <NavListItem icon={DashboardIcon} text="Dashboard" />
          </NavLink>
          <NavLink activeClassName="selected" to="/leaderboard">
            <NavListItem icon={LBIcon} text="Leaderboard" />
          </NavLink>
          <NavLink exact activeClassName="selected" to="/profile">
            <NavListItem icon={ProfileIcon} text="Profile" />
          </NavLink>
          <NavLink activeClassName="selected" to="/about">
            <NavListItem icon={ACMIcon} text="Explore ACM" />
          </NavLink>
          <NavLink activeClassName="selected" to="/discord">
            <NavListItem icon={DiscordIcon} text="Discord" />
          </NavLink>
          <NavLink activeClassName="selected" to="/store">
            <NavListItem icon={SwagIcon} text="ACM Store" />
          </NavLink>
          {isAdmin && (
            <NavLink activeClassName="selected" to="/admin">
              <NavListItem icon={AdminIcon} text="Admin" />
            </NavLink>
          )}
        </div>
        <div>
          <a href="https://www.acmurl.com/portal-feedback">
            <NavListItem icon={FeedbackIcon} text="Feedback" />
          </a>
          <div className="logout" onClick={logout}>
            <NavListItem icon={LogoutIcon} text="Sign Out" />
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapDispatchToProps = (dispatch: ThunkActionCreator) => ({
  logout: () => {
    dispatch(logoutUser());
  },
});

export default connect(null, mapDispatchToProps)(NavbarVertical);
