import React, { useState, ChangeEventHandler, KeyboardEventHandler } from 'react';
import { connect } from 'react-redux';

import LoginLayout from '../components/LoginLayout';
import PasswordForm from '../components/PasswordForm';
import { passwordReset } from '../actions/authActions';

interface PasswordPageProps {
  passwordReset: Function
}

const PasswordPage: React.FC<PasswordPageProps> = (props) => {
  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler = (event) => {
    setValue((event.target as any).value);
  };

  const handleEnter: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setValue('');
      props.passwordReset(value);
    }
  };

  const handleClick = () => {
    props.passwordReset(value);
  };

  return (
    <LoginLayout>
      <PasswordForm
        onChange={handleChange}
        onKeyPress={handleEnter}
        handleClick={handleClick}
        value={value}
      />
    </LoginLayout>
  );
};

export default connect(null, { passwordReset })(PasswordPage);
