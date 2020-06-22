import React, { MouseEventHandler } from 'react';
import { connect } from 'react-redux';

import NavDropdown from '../components/NavDropdown';
import { logoutUser } from '../actions/authActions';
import { ThunkActionCreator } from '../actions/types';

interface NavDropdownContainerProps {
  logout: MouseEventHandler,
};

const NavDropdownContainer: React.FC<NavDropdownContainerProps> = (props) => {
  const { logout } = props;

  return <NavDropdown logout={logout} />;
};

const mapDispatchToProps = (dispatch: ThunkActionCreator) => ({
  logout: () => {
    dispatch(logoutUser());
  },
});

export default connect(null, mapDispatchToProps)(NavDropdownContainer);
