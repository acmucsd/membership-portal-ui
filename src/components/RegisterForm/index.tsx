import React, { ChangeEventHandler, FormEventHandler, FocusEventHandler } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { NavLink } from 'react-router-dom';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

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
    major: string;
    graduationYear: number;
  };
  search: string;
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { handleBlur, handleChange, handleSubmit, setFieldValue, values, search } = props;

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
              <Select
                showSearch
                className="major"
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
            </Form.Item>
          </div>
          <div className="horizontalitems">
            <Form.Item label="Year" className="formitems">
              <Select
                className="year"
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
            </Form.Item>
          </div>
          <Form.Item className="register">
            <Button type="primary" htmlType="submit" className="register-button">
              Register
            </Button>
          </Form.Item>
          <NavLink to={`/login${search}`}>
            <p>
              Already have an account? <b>Sign in.</b>
            </p>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
