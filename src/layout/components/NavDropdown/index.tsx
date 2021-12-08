import React, { MouseEventHandler } from 'react';
import { Divider } from 'antd';
import { NavLink } from 'react-router-dom';

import NavBarItem from '../NavBarItem';

import './style.less';

interface NavDropdownProps {
  logout: MouseEventHandler;
}

const NavDropdown: React.FC<NavDropdownProps> = (props) => {
  const { logout } = props;

  return (
    <nav className="nav-dropdown">
      <section>
        <NavBarItem text="Dashboard" innerDest="/" mobile />
        <NavBarItem text="Leaderboard" innerDest="/leaderboard" mobile />
        <NavBarItem text="Profile" innerDest="/profile" mobile />
      </section>

      <Divider style={{ margin: '0.5rem 0' }} />

      <section>
        <NavBarItem text="About ACM" innerDest="/about" mobile />
        <NavBarItem text="ACM Store" innerDest="/store" mobile />
        <NavBarItem text="Discord" innerDest="/discord" mobile />
      </section>

      <Divider style={{ margin: '0.5rem 0' }} />
      <NavBarItem text="Sign Out" func={logout} mobile />
    </nav>
  );
};

export default NavDropdown;
