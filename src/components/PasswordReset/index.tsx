import React, { ChangeEventHandler, KeyboardEventHandler, FormEventHandler } from 'react';
import { Button, Form, Input } from 'antd';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

interface PasswordFormProps {
  conPass: string;
  newPass: string;
  handleConChange: ChangeEventHandler;
  handleNewChange: ChangeEventHandler;
  onKeyPress: KeyboardEventHandler;
  onSubmit: FormEventHandler;
}

const PasswordForm: React.FC<PasswordFormProps> = (props) => {
  const { conPass, newPass, handleConChange, handleNewChange, onKeyPress, onSubmit } = props;

  return (
    <div className="resetcard">
      <img src={logo} className="logo" alt="logo" />
      <form>
        <Form.Item className="password" label="Reset your password">
          <Input
            name="newPassword"
            type="password"
            placeholder="Password"
            className="input-box"
            value={newPass}
            onChange={handleNewChange}
          />
        </Form.Item>
        <Form.Item className="password">
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="input-box"
            value={conPass}
            onChange={handleConChange}
            onKeyPress={onKeyPress}
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={onSubmit} type="primary" htmlType="submit" className="login-button">
            Submit
          </Button>
        </Form.Item>
      </form>
    </div>
  );
};

export default PasswordForm;
