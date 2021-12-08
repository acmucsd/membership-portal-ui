import React, { MouseEventHandler } from 'react';
import { Divider } from 'antd';
import { NavLink } from 'react-router-dom';

import './style.less';
import NavBarItem from '../NavBarItem';

interface NavDropdownProps {
  logout: MouseEventHandler;
}

const NavDropdown: React.FC<NavDropdownProps> = (props) => {
  const { logout } = props;

  return (
    <nav className="nav-dropdown">
      <section>
        <NavLink activeClassName="selected" className="nav-item" to="/">
          <NavBarItem text="Dashboard" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="/leaderboard">
          <NavBarItem text="Leaderboard" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="/profile">
          <NavBarItem text="Profile" />
        </NavLink>
      </section>

      <Divider style={{ margin: '0.5rem 0' }} />

      <section>
        <NavLink activeClassName="selected" className="nav-item" to="/about">
          <NavBarItem text="About ACM" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="/store">
          <NavBarItem text="ACM Store" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="/discord">
          <NavBarItem text="Discord" />
        </NavLink>
      </section>

      <Divider style={{ margin: '0.5rem 0' }} />
      <div onClick={logout} className="logout">
        Sign Out
      </div>
    </nav>
  );
};

export default NavDropdown;
