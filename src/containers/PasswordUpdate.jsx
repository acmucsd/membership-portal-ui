import { connect } from 'react-redux';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { updatePassword } from '../actions/authActions';
import PasswordReset from '../components/PasswordReset';

const PasswordUpdate = props => {
  const [newPass, setNewPass] = useState('');
  const [conPass, setConPass] = useState('');
  const params = useParams();

  const handleNewChange = event => {
    setNewPass(event.target.value);
  };

  const handleConChange = event => {
    setConPass(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({user: {
      code: params.code,
      newPassword: newPass,
      confirmPassword: conPass
    }});
    props.updatePassword({
      code: params.code,
      newPassword: newPass,
      confirmPassword: conPass
    });
  };

  const handleEnter = event => {
    if (event.key === 'Enter') {
      props.updatePassword({
        code: params.code,
        newPassword: newPass,
        confirmPassword: conPass
      });
    }
  };

  return (
    <PasswordReset
      handleNewChange={handleNewChange}
      handleConChange={handleConChange}
      onSubmit={handleSubmit}
      onKeyPress={handleEnter}
      newPass={newPass}
      conPass={conPass}
    />
  );
};

export default connect(
  null,
  { updatePassword }
)(PasswordUpdate);
