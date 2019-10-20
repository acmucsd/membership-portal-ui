import React from 'react';
import LoginLayout from '../components/LoginLayout';
import PasswordUpdate from '../containers/PasswordUpdate';

const RegisterPage = () => {
  return (
    <LoginLayout>
      <PasswordUpdate />
    </LoginLayout>
  );
};

export default RegisterPage;