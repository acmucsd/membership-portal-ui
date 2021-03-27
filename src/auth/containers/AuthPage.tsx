import React from 'react';
import LoginLayout from '../components/LoginLayout';
import AuthenticateCard from '../components/AuthenticateCard';

const AuthPage: React.FC = () => {
  return (
    <LoginLayout>
      <AuthenticateCard />
    </LoginLayout>
  );
};

export default AuthPage;
