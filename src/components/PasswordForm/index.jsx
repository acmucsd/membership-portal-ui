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
***REMOVED***

PasswordForm.propTypes = {
  onKeyPress: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
***REMOVED***

export default PasswordForm;
