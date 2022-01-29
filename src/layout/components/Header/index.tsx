import React from 'react';
import { NavLink } from 'react-router-dom';

import NavDropdown from '../../containers/NavDropdown';
import NavProfile from '../../containers/NavProfile';
import Icon from '@ant-design/icons';
import logo from '../../../assets/graphics/logo.png';
import './custom.less';
import { Switch } from 'antd';
import './style.less';
import { addLeadingSlash } from 'history/PathUtils';
import ThemeContext from '../../../styles/ThemeContext/themeContext';
import { ReactComponent as MoonIcon } from '../../../assets/icons/moon.svg';
import { ReactComponent as SunIcon } from '../../../assets/icons/sun.svg';


const Header: React.FC = () => {

  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const HandleModeSwitch = () => {
    toggleTheme?.();
  }

  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header">
          <NavLink className="title" to="/">
            <img className="logo" src={logo} alt="ACM Logo" />
            <span className="subheading">&nbsp;Membership Portal</span>
          </NavLink>
          {document.body.className === 'dark-theme' ? 
          <Switch onClick={HandleModeSwitch} 
          checkedChildren={<Icon component={MoonIcon} className="icon" />}
          unCheckedChildren={<Icon component={SunIcon} className="icon" />}
          className="mode-switch" defaultChecked/> 
          : <Switch onClick={HandleModeSwitch}
          checkedChildren={<Icon component={MoonIcon} className="icon" />}
          unCheckedChildren={<Icon component={SunIcon} className="icon" />} 
          className="mode-switch" />}
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
