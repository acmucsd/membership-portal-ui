import React, { useState, ChangeEventHandler, KeyboardEventHandler, FormEventHandler } from 'react';

import LoginLayout from '../components/LoginLayout';
import PasswordForm from '../components/PasswordForm';
import { passwordReset } from '../authActions';

const PasswordPage: React.FC = () => {
  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler = (event) => {
    setValue((event.target as any).value);
  };

  const handleEnter: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setValue('');
      passwordReset(value);
    }
  };

  const handleClick: FormEventHandler = (event) => {
    event.preventDefault();
    setValue('');
    passwordReset(value);
  };

  return (
    <LoginLayout>
      <PasswordForm onChange={handleChange} onKeyPress={handleEnter} handleClick={handleClick} value={value} />
    </LoginLayout>
  );
};

export default PasswordPage;
