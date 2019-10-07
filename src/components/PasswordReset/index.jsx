import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

const PasswordForm = () => {
  return (
    <div className="resetcard">
      <img src={logo} className="logo" alt="logo" />
      <form>
        <Form.Item className="code" label="Reset your password">
          <Input
            name="code"
            type="text"
            placeholder="Activation code"
            className="input-box"
            // value={props.values.email}
            // onChange={props.handleChange}
            // onBlur={props.handleBlur}
          />
        </Form.Item>
        <Form.Item className="password">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            className="input-box"
            // value={props.values.email}
            // onChange={props.handleChange}
            // onBlur={props.handleBlur}
          />
        </Form.Item>
        <Form.Item className="password">
          <Input
            name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
            className="input-box"
            // value={props.values.password}
            // onChange={props.handleChange}
            // onBlur={props.handleBlur}
          />
        </Form.Item>
      </form>
    </div>
  );
};

PasswordForm.propTypes = {
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
};

export default PasswordForm;
