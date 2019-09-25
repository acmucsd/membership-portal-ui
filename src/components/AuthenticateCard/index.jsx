import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

const AuthenticateCard = () => {
  return (
    <div className="auth-card">
      <img src={logo} alt="logo" height="115" width="115" />
      <h1>A verification email has been sent!</h1>
      <h3>Please wait up to 1 to 3 minutes for the email.</h3>
      <NavLink to="/login">
        <p>
          <b>Click here to go back to the log in page</b>
        </p>
      </NavLink>
    </div>
  );
};

export default AuthenticateCard;
