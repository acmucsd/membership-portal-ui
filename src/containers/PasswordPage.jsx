import React, { useState } from 'react';
import { connect } from 'react-redux';

import LoginLayout from '../components/LoginLayout';
import PasswordForm from '../components/PasswordForm';
import { passwordReset } from '../actions/passwordActions';

const PasswordPage = props => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleEnter = event => {
    if (event.key === 'Enter') {
      props.passwordReset(value);
    }
  };

  return (
    <LoginLayout>
      <PasswordForm onChange={handleChange} onKeyPress={handleEnter} value={value} />
    </LoginLayout>
  );
};

export default connect(
  null,
  { passwordReset }
)(PasswordPage);
