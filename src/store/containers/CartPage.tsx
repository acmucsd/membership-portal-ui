import React from 'react';
import PageLayout from '../../layout/containers/PageLayout';
import CartPage from '../components/CartPage';

const CartPageContainer: React.FC = () => {
  return (
    <PageLayout>
      <CartPage />
    </PageLayout>
  );
};

export default CartPageContainer;
