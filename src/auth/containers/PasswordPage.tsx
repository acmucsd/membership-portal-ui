import React, { ChangeEventHandler, FormEventHandler, KeyboardEventHandler, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { passwordReset } from '../authSlice';
import LoginLayout from '../components/LoginLayout';
import PasswordForm from '../components/PasswordForm';

const PasswordPage: React.FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const handleChange: ChangeEventHandler = (event) => {
    setValue((event.target as any).value);
  };

  const handleEnter: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setValue('');
      dispatch(passwordReset(value));
    }
  };

  const handleClick: FormEventHandler = (event) => {
    event.preventDefault();
    setValue('');
    dispatch(passwordReset(value));
  };

  return (
    <LoginLayout>
      <PasswordForm onChange={handleChange} onKeyPress={handleEnter} handleClick={handleClick} value={value} />
    </LoginLayout>
  );
};

export default PasswordPage;
