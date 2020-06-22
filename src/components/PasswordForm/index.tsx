import React, { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

interface PasswordFormProps {
  handleClick: MouseEventHandler,
  onKeyPress: KeyboardEventHandler,
  onChange: ChangeEventHandler,
  value: string,
};

const PasswordForm: React.FC<PasswordFormProps> = (props) => {
  const { handleClick, onKeyPress, onChange, value } = props;

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
          <Button
            type="primary"
            onClick={handleClick}
            className="password-reset"
          >
            Submit
          </Button>
        </Form.Item>
      </form>
    </div>
  );
};

export default PasswordForm;
