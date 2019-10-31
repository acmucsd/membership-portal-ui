import { connect } from 'react-redux';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { updatePassword } from '../actions/authActions';
import PasswordReset from '../components/PasswordReset';

const PasswordUpdate = props => {
  const [conPass, setConPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const params = useParams();

  const handleConChange = event => {
    setConPass(event.target.value);
  };

  const handleNewChange = event => {
    setNewPass(event.target.value);
  };

  const handleEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      props.updatePassword({
        code: params.code,
        newPassword: newPass,
        confirmPassword: conPass,
      });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.updatePassword({
      code: params.code,
      newPassword: newPass,
      confirmPassword: conPass,
    });
  };

  return (
    <PasswordReset
      conPass={conPass}
      handleNewChange={handleNewChange}
      handleConChange={handleConChange}
      newPass={newPass}
      onSubmit={handleSubmit}
      onKeyPress={handleEnter}
    />
  );
};

export default connect(
  null,
  { updatePassword }
)(PasswordUpdate);
