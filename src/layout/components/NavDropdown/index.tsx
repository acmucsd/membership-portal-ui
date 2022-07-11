import React, { useContext } from 'react';
import { Divider } from 'antd';
import { logoutUser } from '../../../auth/utils';
import NavBarItem from '../NavBarItem';
import './style.less';
import { AppContext } from '../../../context';

const NavDropdown: React.FC = () => {
  const { setUser } = useContext(AppContext);

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
      <NavBarItem text="Sign Out" func={() => logoutUser(setUser)} mobile />
    </nav>
  );
};

export default NavDropdown;
