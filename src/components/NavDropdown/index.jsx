import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import { NavLink } from 'react-router-dom';

import './style.less';
import NavListItem from '../NavListItem';

const NavDropdown = props => {
  return (
    <nav className="nav-dropdown">
      <section>
        <NavLink activeClassName="selected" className="nav-item" to="/dashboard">
          <NavListItem link="/dashboard" text="Dashboard" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="/leaderboard">
          <NavListItem text="Leaderboard" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="/profile">
          <NavListItem text="Profile" />
        </NavLink>
      </section>

      <Divider style={{margin: '0.5rem 0'}} />

      <section>
        <NavLink activeClassName="selected" className="nav-item" to="/about">
          <NavListItem text="About ACM" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="/swag">
          <NavListItem text="ACM Store" />
        </NavLink>
        <NavLink activeClassName="selected" className="nav-item" to="https://discord.gg/mK9Zrf4d">
          <NavListItem text="Discord" />
        </NavLink>
      </section>

      <Divider style={{ margin: '0.5rem 0' }} />
      <div onClick={props.onClick} className="logout">
        Sign Out
      </div>
    </nav>
  );
};

NavDropdown.propTypes = {
  onClick: PropTypes.func
};

export default NavDropdown;
