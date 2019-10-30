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
  ***REMOVED***

  const handleNewChange = event => {
    setNewPass(event.target.value);
  ***REMOVED***

  const handleEnter = event => {
    if (event.key === 'Enter') {
      props.updatePassword({
        code: params.code,
        newPassword: newPass,
        confirmPassword: conPass,
***REMOVED***;
    }
  ***REMOVED***

  const handleSubmit = () => {
    props.updatePassword({
      code: params.code,
      newPassword: newPass,
      confirmPassword: conPass,
***REMOVED***
  ***REMOVED***

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
***REMOVED***

export default connect(
  null,
  { updatePassword }
)(PasswordUpdate);
