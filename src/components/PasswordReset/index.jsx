import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

const PasswordForm = (props) => (
  <div className="resetcard">
    <img src={logo} className="logo" alt="logo" />
    <form>
      <Form.Item className="password" label="Reset your password">
        <Input
          name="newPassword"
          type="password"
          placeholder="Password"
          className="input-box"
          value={props.newPass}
          onChange={props.handleNewChange}
        />
      </Form.Item>
      <Form.Item className="password">
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="input-box"
          value={props.conPass}
          onChange={props.handleConChange}
          onKeyPress={props.onKeyPress}
        />
      </Form.Item>
      <Form.Item>
        <Button onClick={props.onSubmit} type="primary" htmlType="submit" className="login-button">
              Submit
        </Button>
      </Form.Item>
    </form>
  </div>
);

PasswordForm.propTypes = {
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
};

export default PasswordForm;
