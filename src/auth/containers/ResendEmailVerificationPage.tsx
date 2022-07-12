import React, { useContext } from 'react';
import { AppContext } from '../../context';
import PageLayout from '../../layout/containers/PageLayout';
import ResendEmailVerificationPage from '../components/ResendEmailVerificationPage';

const ResendEmailVerificationContainer: React.FC = () => {
  const {
    user: { email },
  } = useContext(AppContext);

  return (
    <PageLayout>
      <ResendEmailVerificationPage email={email} />
    </PageLayout>
  );
};

export default ResendEmailVerificationContainer;
