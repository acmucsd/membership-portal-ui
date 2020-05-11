import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select } from 'antd';
import { NavLink } from 'react-router-dom';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

const { Option } = Select;

function getYears() {
  const currentYear = new Date().getFullYear();
  return [...Array(6)].map((_, i) => i + currentYear);
}

const years = getYears();

const RegisterForm = (props) => {
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
  } = props;

  return (
    <div className="registercard">
      <div className="formcontent">
        <img src={logo} alt="logo" height="115" width="115" />
        <h1>Register for ACM@UCSD</h1>
        <form onSubmit={handleSubmit}>
          <div className="horizontalitems">
            <Form.Item label="First Name" className="formitems">
              <Input
                name="firstName"
                className="firstname"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item label="Last Name" className="formitems">
              <Input
                name="lastName"
                className="lastname"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </div>
          <Form.Item label="Email (user@ucsd.edu)" className="formitems">
            <Input
              name="email"
              type="email"
              className="input-box"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item label="Password" className="formitems">
            <Input
              name="password"
              type="password"
              className="input-box"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item label="Confirm password" className="formitems">
            <Input
              name="confirmpassword"
              type="password"
              className="input-box"
              value={values.confirmpassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <div className="horizontalitems">
            <Form.Item label="Major" className="formitems">
              <Input
                name="major"
                className="major"
                value={values.major}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item label="Year" className="formitems">
              <Select
                className="year"
                onBlur={(value) => setFieldValue('graduationYear', value)}
                onChange={(value) => setFieldValue('graduationYear', value)}
                value={values.graduationYear}
              >
                {years.map((num) => (
                  <Option key={num} value={num}>
                    {num}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <Form.Item className="register">
            <Button
              type="primary"
              htmlType="submit"
              className="register-button"
            >
              Register
            </Button>
          </Form.Item>
          <NavLink to="/login">
            <p>
              Already have an account? <b>Sign in.</b>
            </p>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

RegisterForm.propTypes = {
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default RegisterForm;
