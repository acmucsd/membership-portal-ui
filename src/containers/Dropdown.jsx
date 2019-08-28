import React from 'react';
import { connect } from 'react-redux';

import Dropdown from '../components/NavDropdown';
import { logoutUser } from '../actions/authActions';

const DropdownContainer = props => {
  return <Dropdown logout={props.logout} />;
};

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logoutUser());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(DropdownContainer);
