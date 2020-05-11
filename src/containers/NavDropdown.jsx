import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavDropdown from '../components/NavDropdown';
import { logoutUser } from '../actions/authActions';

const NavDropdownContainer = (props) => {
  const { logout } = props;

  return <NavDropdown logout={logout} />;
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logoutUser());
  },
});

NavDropdownContainer.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(NavDropdownContainer);
