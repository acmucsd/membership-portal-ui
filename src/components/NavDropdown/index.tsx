import React, { MouseEventHandler } from 'react';
import { Divider } from 'antd';
import { NavLink } from 'react-router-dom';

import './style.less';
import NavListItem from '../NavListItem';

interface NavDropdownProps {
  logout: MouseEventHandler,
};

const NavDropdown: React.FC<NavDropdownProps> = (props) => {
  const { logout } = props;

  return (
    <nav className="nav-dropdown">
      <section>
        <NavLink activeClassName="selected" className="nav-item" to="/">
          <NavListItem text="Dashboard" />
        </NavLink>
        <NavLink
          activeClassName="selected"
          className="nav-item"
          to="/leaderboard"
        >
          <NavListItem text="Leaderboard" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="/profile">
          <NavListItem text="Profile" />
        </NavLink>
      </section>

      <Divider style={{ margin: '0.5rem 0' }} />

      <section>
        <NavLink activeClassName="selected" className="nav-item" to="/about">
          <NavListItem text="About ACM" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="/store">
          <NavListItem text="ACM Store" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="/discord">
          <NavListItem text="Discord" />
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
