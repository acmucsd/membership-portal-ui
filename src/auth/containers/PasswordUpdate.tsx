import React, { useState, ChangeEventHandler, KeyboardEventHandler, FormEventHandler } from 'react';
import { useParams } from 'react-router-dom';

import { updatePassword } from '../authActions';
import PasswordReset from '../components/PasswordReset';

const PasswordUpdate: React.FC = () => {
  const [conPass, setConPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const params: { [key: string]: any } = useParams();

  const handleConChange: ChangeEventHandler = (event) => {
    setConPass((event.target as any).value);
  };

  const handleNewChange: ChangeEventHandler = (event) => {
    setNewPass((event.target as any).value);
  };

  const handleEnter: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      updatePassword({
        code: params.code,
        newPassword: newPass,
        confirmPassword: conPass,
      });
    }
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    updatePassword({
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

export default PasswordUpdate;
