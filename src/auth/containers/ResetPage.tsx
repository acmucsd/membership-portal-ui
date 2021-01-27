import React from 'react';
import LoginLayout from '../components/LoginLayout';
import PasswordUpdate from './PasswordUpdate';

const RegisterPage: React.FC = () => {
  return (
    <LoginLayout>
      <PasswordUpdate />
    </LoginLayout>
  );
};

export default RegisterPage;
