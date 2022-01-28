import React from 'react';
import { NavLink } from 'react-router-dom';

import NavDropdown from '../../containers/NavDropdown';
import NavProfile from '../../containers/NavProfile';
import Icon from '@ant-design/icons';
import logo from '../../../assets/graphics/logo.png';
import SunIcon from '../../../assets/graphics/logo.png';
import MoonIcon from '../../../assets/graphics/logo.png';
import './custom.less';
import { Switch } from 'antd';
import './style.less';
import { addLeadingSlash } from 'history/PathUtils';

const Header: React.FC = () => {
  var less = require("less");
  const HandleModeSwitch = () => {
    less.modifyVars({ "theme": "dark" });
  }
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header">
          <NavLink className="title" to="/">
            <img className="logo" src={logo} alt="ACM Logo" />
            <span className="subheading">&nbsp;Membership Portal</span>
          </NavLink>
          <Switch onClick={HandleModeSwitch} className="mode-switch"/>
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
