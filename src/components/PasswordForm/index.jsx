import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

const PasswordForm = (props) => {
  const { onKeyPress, onChange, value } = props;

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
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={value}
          />
        </Form.Item>
      </form>
    </div>
  );
};

PasswordForm.propTypes = {
  onKeyPress: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
};

export default PasswordForm;
