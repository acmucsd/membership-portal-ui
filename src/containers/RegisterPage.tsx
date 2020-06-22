import React from 'react';
import LoginLayout from '../components/LoginLayout';
import RegisterForm from './RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <LoginLayout>
      <RegisterForm />
    </LoginLayout>
  );
};

export default RegisterPage;
