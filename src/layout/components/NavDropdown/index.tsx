import React from 'react';
import { Divider } from 'antd';
import { logoutUser } from '../../../auth/authSlice';
import { useAppDispatch } from '../../../redux/store';
import NavBarItem from '../NavBarItem';
import './style.less';

const NavDropdown: React.FC = () => {
  const dispatch = useAppDispatch();

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
      <NavBarItem text="Sign Out" func={() => dispatch(logoutUser())} mobile />
    </nav>
  );
};

export default NavDropdown;
