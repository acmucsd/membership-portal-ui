import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

const PasswordForm = (props) => {
  const {
    conPass,
    newPass,
    handleConChange,
    handleNewChange,
    onKeyPress,
    onSubmit,
  } = props;

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
          <Button
            onClick={onSubmit}
            type="primary"
            htmlType="submit"
            className="login-button"
          >
            Submit
          </Button>
        </Form.Item>
      </form>
    </div>
  );
};

PasswordForm.propTypes = {
  conPass: PropTypes.string.isRequired,
  newPass: PropTypes.string.isRequired,
  handleConChange: PropTypes.func.isRequired,
  handleNewChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PasswordForm;
