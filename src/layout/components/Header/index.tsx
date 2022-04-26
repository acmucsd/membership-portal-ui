import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '@ant-design/icons';
import { Switch } from 'antd';
import NavDropdown from '../../containers/NavDropdown';
import NavProfile from '../../containers/NavProfile';
import logo from '../../../assets/graphics/logo.png';
import './style.less';
import ThemeContext from '../../../styles/ThemeContext/themeContext';
import { ReactComponent as MoonIcon } from '../../../assets/icons/moon.svg';
import { ReactComponent as SunIcon } from '../../../assets/icons/sun.svg';

const Header: React.FC = () => {
  // gets theme and toggleTheme function from the ThemeContext
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  const HandleModeSwitch = () => {
    toggleTheme();
  };

  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header">
          <NavLink className="title" to="/">
            <img className="logo" src={logo} alt="ACM Logo" />
            <span className="subheading">&nbsp;Membership Portal</span>
          </NavLink>
          <Switch
            onClick={HandleModeSwitch}
            checkedChildren={<Icon component={MoonIcon} className="moon-icon" />}
            unCheckedChildren={<Icon component={SunIcon} className="sun-icon" />}
            className="mode-switch"
            defaultChecked={theme !== 'light'}
          />

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
