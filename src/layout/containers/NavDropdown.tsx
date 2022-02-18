import React from 'react';

import NavDropdown from '../components/NavDropdown';
import { logoutUser } from '../../auth/authActions';

const NavDropdownContainer: React.FC = () => {
  return <NavDropdown logout={logoutUser} />;
};

export default NavDropdownContainer;
