import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

const PasswordForm = (props) => {
  return (
    <div className="passwordcard">
      <img src={logo} className="logo" alt="logo" />
      <form>
        <Form.Item className="email" label="Enter Email Here">
          <Input
            name="email"
            type="email"
            placeholder="Email (user@ucsd.edu)"
            className="input-box"
            onChange={props.onChange}
            onKeyPress={props.onKeyPress}
            value={props.value}
          />
        </Form.Item>
      </form>
    </div>
  );
};

PasswordForm.propTypes = {
  onKeyPress: PropTypes.func,
  onChange: PropTypes.func,
  values: PropTypes.object,
};

export default PasswordForm;
