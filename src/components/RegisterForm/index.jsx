import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select } from 'antd';
import { NavLink } from 'react-router-dom';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

const { Option } = Select;

function getYears() {
    const currentYear = new Date().getFullYear();
    return [...Array(6)].map((_,i) => i + currentYear);
}

const years = getYears();

const RegisterForm = props => { 
  return (
    <div className="registercard">
      <div className="content">
        <img src={logo} alt="logo" height="115" width="115" />
        <h1>Register for ACM@UCSD</h1>
        <form onSubmit={props.handleSubmit}>
          <div className="horizontalitems">
            <Form.Item label="First Name" className="formitems">
              <Input
                name="firstname"
                className="firstname"
                value={props.values}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
            </Form.Item>
            <Form.Item label="Last Name" className="formitems">
              <Input
                name="lastname"
                className="lastname"
                value={props.values}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
            </Form.Item>
          </div>
          <Form.Item label="Email (user@ucsd.edu)" className="formitems">
            <Input
              name="email"
              type="email"
              className="input-box"
              value={props.values}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <Form.Item label="Password" className="formitems">
            <Input
              name="password"
              type="password"
              className="input-box"
              value={props.values}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <Form.Item label="Confirm password" className="formitems">
            <Input
              name="confirmpassword"
              type="password"
              className="input-box"
              value={props.values}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <div className="horizontalitems">
            <Form.Item label="Major" className="formitems">
              <Input
                name="major"
                className="major"
                value={props.values}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
            </Form.Item>
            <Form.Item label="Year" className="formitems">
              <Select className="year" value={props.values}>
                {years.map(num => (
                  <Option value={num}>{num}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <Form.Item className="register">
            <Button type="primary" htmlType="submit" className="register-button">
              Register
            </Button>
          </Form.Item>
          <NavLink to="/forgot-password">
            <p>
              Already have an account? <b>Sign in.</b>
            </p>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

// TODO: Swap out proptypes with formik's implementation.
RegisterForm.propTypes = {
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.string,
};

export default RegisterForm;
