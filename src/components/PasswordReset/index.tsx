import React, { ChangeEventHandler, KeyboardEventHandler, FormEventHandler } from 'react';

import password from '../../assets/icons/password-icon.svg';

import './style.less';

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
    <div className="reset-card">
      <h2 className="title">
        Reset
        <br />
        Password
      </h2>
      <form>
        <div className="password-container">
          <img className="icon" alt="" src={password} />
          <input
            name="newPassword"
            type="password"
            placeholder="Password"
            className="input-box"
            value={newPass}
            onChange={handleNewChange}
          />
        </div>
        <div className="password-container">
          <img className="icon" alt="" src={password} />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="input-box"
            value={conPass}
            onChange={handleConChange}
            onKeyPress={onKeyPress}
          />
        </div>
        <button onClick={onSubmit} type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordForm;
