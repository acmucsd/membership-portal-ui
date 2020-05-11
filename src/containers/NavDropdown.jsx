import React from 'react';
import { connect } from 'react-redux';

import NavDropdown from '../components/NavDropdown';
import { logoutUser } from '../actions/authActions';

const NavDropdownContainer = (props) => {
  return <NavDropdown logout={props.logout} />;
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logoutUser());
  },
});

export default connect(null, mapDispatchToProps)(NavDropdownContainer);
