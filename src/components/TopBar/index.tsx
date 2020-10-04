import React from 'react';
import withSizes from 'react-sizes';
import { NavLink } from 'react-router-dom';

import NavDropdown from '../../containers/NavDropdown';
import NavProfile from '../../containers/NavProfile';

import logo from '../../assets/graphics/logo.svg';

import './style.less';

interface TopBarProps {
  isMobile: boolean;
}

const TopBar: React.FC<TopBarProps> = (props) => {
  const { isMobile } = props;
  return (
    <>
      <div className="header">
        <NavLink className="title" to="/">
          <img alt="ACM" id="logo" src={logo} />
          <span className={isMobile ? 'hidden' : 'subheading'}>&nbsp;Membership Portal</span>
        </NavLink>
        <div className="profile">
          <NavProfile menu={<NavDropdown />} />
        </div>
      </div>
      <div className="wainbow" />
    </>
  );
};

const mapSizesToProps = ({ width }: { width: number }) => ({
  isMobile: width < 768,
});

export default withSizes(mapSizesToProps)(TopBar);
