import React from 'react';
import AdminPage from '../components/AdminPage';
import PageLayout from './PageLayout';

const AdminPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <AdminPage />
    </PageLayout>
  );
};

export default AdminPageContainer;
