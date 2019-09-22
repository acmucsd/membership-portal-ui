import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

const PasswordForm = () => {
  return (
    <div className="passwordcard">
      <img src={logo} alt="logo" height="115" width="115" />
      <h1>Sorry we are still working on a password reset :(</h1>
      <h3>Please contact us at acmucsd@gmail.com</h3>
      <NavLink to="/login">
        <p>
          <b>Click here to go back to the log in page</b>
        </p>
      </NavLink>
    </div>
  );
};

export default PasswordForm;
