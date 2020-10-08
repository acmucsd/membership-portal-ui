import React, { FocusEventHandler, ChangeEventHandler, FormEventHandler } from 'react';
import { NavLink } from 'react-router-dom';

import email from '../../assets/icons/email-icon.svg';
import password from '../../assets/icons/password-icon.svg';

import './style.less';

interface SignInFormProps {
  handleBlur: FocusEventHandler;
  handleChange: ChangeEventHandler;
  handleSubmit: FormEventHandler;
  values: {
    email: string;
    password: string;
  };
  search: string;
  errors: {
    email: string | null;
    password: string | null;
  };
}

const SignInForm: React.FC<SignInFormProps> = (props) => {
  const { handleBlur, handleChange, handleSubmit, values, search, errors } = props;

  return (
    <div className="signin-card">
      <h2 className="title">
        Welcome
        <br />
        to ACM!
      </h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-item">
          <div className="form-input">
            <div className="icon-container">
              <img className="icon" alt="" src={email} />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email (user@ucsd.edu)"
              className="input-box"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <p className="form-error">{errors.email ? errors.email : null}</p>
        </div>
        <div className="form-item">
          <div className="form-input">
            <div className="icon-container">
              <img className="icon" alt="" src={password} />
            </div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input-box"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <p className="form-error">{errors.password ? errors.password : null}</p>
        </div>
        <div className="forgot-container">
          <NavLink to="/forgot-password">
            <p className="forgot">Forgot your password?</p>
          </NavLink>
        </div>
        <button type="submit" className="sign-in">
          Sign In
        </button>
        <NavLink to={`/register${search}`}>
          <button type="button" className="sign-up">
            Sign Up
          </button>
        </NavLink>
      </form>
    </div>
  );
};

export default SignInForm;
