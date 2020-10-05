import React from 'react';
import { NavLink } from 'react-router-dom';

import NavDropdown from '../../containers/NavDropdown';
import NavProfile from '../../containers/NavProfile';

import logo from '../../assets/graphics/logo.svg';

import './style.less';

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header">
          <NavLink className="title" to="/">
            <img className="logo" src={logo} alt="ACM Logo" />
            <span className="subheading">&nbsp;Membership Portal</span>
          </NavLink>
          <div className="profile">
            <NavProfile menu={<NavDropdown />} />
          </div>
        </div>
        <div className="wainbow" />
      </div>
      <div className="header-padding" />
    </div>
  );
};

export default Header;
