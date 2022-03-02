import React from 'react';
import PageLayout from '../../layout/containers/PageLayout';
import CheckoutPage from '../components/CheckoutPage';

const CheckoutPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <CheckoutPage />
    </PageLayout>
  );
};

export default CheckoutPageContainer;
