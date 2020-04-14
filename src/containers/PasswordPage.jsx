import React, { useState } from 'react';
import { connect } from 'react-redux';

import LoginLayout from '../components/LoginLayout';
import PasswordForm from '../components/PasswordForm';
import { passwordReset } from '../actions/authActions';

const PasswordPage = props => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  ***REMOVED***

  const handleEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setValue('');
      props.passwordReset(value);
    }
  ***REMOVED***

  return (
    <LoginLayout>
      <PasswordForm onChange={handleChange} onKeyPress={handleEnter} value={value} />
    </LoginLayout>
  );
***REMOVED***

export default connect(
  null,
  { passwordReset }
)(PasswordPage);
