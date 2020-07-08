import React from 'react';
import AdminOrderPage from '../components/AdminOrderPage';
import PageLayout from './PageLayout';

const AdminOrderPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <AdminOrderPage />
    </PageLayout>
  );
};

export default AdminOrderPageContainer;
