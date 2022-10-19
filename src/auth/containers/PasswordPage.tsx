import React, { useState, ChangeEventHandler, KeyboardEventHandler, FormEventHandler } from 'react';
import { connect } from 'react-redux';

import LoginLayout from '../components/LoginLayout';
import PasswordForm from '../components/PasswordForm';
import { passwordReset } from '../authActions';

interface PasswordPageProps {
  passwordReset: Function;
}

const PasswordPage: React.FC<PasswordPageProps> = (props) => {
  const [value, setValue] = useState('');
  const { passwordReset: passwordResetFunction } = props;

  const handleChange: ChangeEventHandler = (event) => {
    setValue((event.target as any).value);
  };

  const handleEnter: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setValue('');
      passwordResetFunction(value);
    }
  };

  const handleClick: FormEventHandler = (event) => {
    event.preventDefault();
    setValue('');
    passwordResetFunction(value);
  };

  return (
    <LoginLayout>
      <PasswordForm onChange={handleChange} onKeyPress={handleEnter} handleClick={handleClick} value={value} />
    </LoginLayout>
  );
};

export default connect(null, { passwordReset })(PasswordPage);
