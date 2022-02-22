import React, { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';

import Icon from '@ant-design/icons';
import { ReactComponent as EmailIcon } from '../../../assets/icons/email-icon.svg';

import './style.less';

interface PasswordFormProps {
  handleClick: MouseEventHandler;
  onKeyPress: KeyboardEventHandler;
  onChange: ChangeEventHandler;
  value: string;
}

const PasswordForm: React.FC<PasswordFormProps> = (props) => {
  const { handleClick, onKeyPress, onChange, value } = props;

  return (
    <div className="password-card">
      <h2 className="title">
        Reset
        <br />
        Password
      </h2>
      <form className="form">
        <div className="email-container">
          <Icon className="icon" alt="" component={EmailIcon} />
          <input
            name="email"
            type="email"
            placeholder="Email (user@ucsd.edu)"
            className="input-box"
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={value}
          />
        </div>
        <button className="submit" type="submit" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordForm;
