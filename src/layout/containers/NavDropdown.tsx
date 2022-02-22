import React, { MouseEventHandler } from 'react';
import { connect } from 'react-redux';

import NavDropdown from '../components/NavDropdown';
import { logoutUser } from '../../auth/authActions';

interface NavDropdownContainerProps {
  logout: MouseEventHandler;
}

const NavDropdownContainer: React.FC<NavDropdownContainerProps> = (props) => {
  const { logout } = props;

  return <NavDropdown logout={logout} />;
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logoutUser());
  },
});

export default connect(null, mapDispatchToProps)(NavDropdownContainer);
