import React from 'react';
import LoginLayout from '../components/LoginLayout';
import SignInForm from './SignInForm';

const LoginPage: React.FC = () => {
  return (
    <>
      <LoginLayout>
        <SignInForm />
      </LoginLayout>
    </>
  );
};

export default LoginPage;
