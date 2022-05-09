import React from 'react';
import { useSelector } from 'react-redux';
import PageLayout from '../../layout/containers/PageLayout';
import { authSelector } from '../authSlice';
import ResendEmailVerificationPage from '../components/ResendEmailVerificationPage';

const ResendEmailVerificationContainer: React.FC = () => {
  const {
    profile: { email },
  } = useSelector(authSelector);

  return (
    <PageLayout>
      <ResendEmailVerificationPage email={email} />
    </PageLayout>
  );
};

export default ResendEmailVerificationContainer;
