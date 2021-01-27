import React, { ChangeEventHandler, FormEventHandler, FocusEventHandler } from 'react';
import { Select } from 'antd';
import { NavLink } from 'react-router-dom';

import './style.less';

import NameIcon from '../../../assets/icons/name-icon.svg';
import EmailIcon from '../../../assets/icons/email-icon.svg';
import PasswordIcon from '../../../assets/icons/password-icon.svg';
import MajorIcon from '../../../assets/icons/major-icon.svg';
import YearIcon from '../../../assets/icons/year-icon.svg';

import majorsData from './majors.json';

const { Option } = Select;

const years = [...Array(6)].map((_, i) => i + new Date().getFullYear());

interface RegisterFormProps {
  handleBlur: FocusEventHandler;
  handleChange: ChangeEventHandler;
  handleSubmit: FormEventHandler;
  setFieldValue: Function;
  values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmpassword: string;
    major: string | undefined;
    graduationYear: number;
  };
  search: string;
  errors: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
    confirmpassword: string | null;
    major: string | null;
  };
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { handleBlur, handleChange, handleSubmit, setFieldValue, values, search, errors } = props;

  return (
    <div className="signup-card">
      <h2 className="title">
        Become a
        <br />
        Member
      </h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-item">
          <div className="form-input">
            <div className="icon-container">
              <img className="icon" src={NameIcon} alt="Name Icon" />
            </div>
            <input
              name="firstName"
              className="input-box"
              placeholder="First name"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <p className="form-error">{errors.firstName ? errors.firstName : null}</p>
        </div>
        <div className="form-item">
          <div className="form-input">
            <div className="icon-container">
              <img className="icon" src={NameIcon} alt="Name Icon" />
            </div>
            <input
              name="lastName"
              className="input-box"
              placeholder="Last name"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <p className="form-error">{errors.lastName ? errors.lastName : null}</p>
        </div>
        <div className="form-item">
          <div className="form-input">
            <div className="icon-container">
              <img className="icon" src={EmailIcon} alt="Email Icon" />
            </div>
            <input
              name="email"
              type="email"
              className="input-box"
              placeholder="UCSD Email"
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
              <img className="icon" src={PasswordIcon} alt="Password Icon" />
            </div>
            <input
              name="password"
              type="password"
              className="input-box"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <p className="form-error">{errors.password ? errors.password : null}</p>
        </div>
        <div className="form-item">
          <div className="form-input">
            <div className="icon-container">
              <img className="icon" src={PasswordIcon} alt="Password Icon" />
            </div>
            <input
              name="confirmpassword"
              type="password"
              className="input-box"
              placeholder="Confirm password"
              value={values.confirmpassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <p className="form-error">{errors.confirmpassword ? errors.confirmpassword : null}</p>
        </div>
        <div className="form-item">
          <div className="form-input major">
            <div className="icon-container">
              <img className="icon" src={MajorIcon} alt="Major Icon" />
            </div>
            <Select
              className="input-box"
              showSearch
              placeholder="Major"
              value={values.major}
              onChange={(value: string) => setFieldValue('major', value)}
              onBlur={(value: string) => setFieldValue('major', value)}
            >
              {majorsData.majors.map((major) => (
                <Option key={major} value={major}>
                  {major}
                </Option>
              ))}
            </Select>
          </div>
          <p className="form-error">{errors.major ? errors.major : null}</p>
        </div>
        <div className="form-item year">
          <div className="form-input year">
            <div className="icon-container">
              <img className="icon" src={YearIcon} alt="Year Icon" />
            </div>
            <Select
              className="input-box"
              onBlur={(value: string | number) => setFieldValue('graduationYear', value)}
              onChange={(value: string | number) => setFieldValue('graduationYear', value)}
              value={values.graduationYear}
            >
              {years.map((num) => (
                <Option key={num} value={num}>
                  {num}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <button className="sign-up" type="submit">
          Sign Up
        </button>
        <NavLink to={`/login${search}`}>
          <p className="login">
            Already have an account? <b>Sign in.</b>
          </p>
        </NavLink>
      </form>
    </div>
  );
};

export default RegisterForm;
