import React from 'react';
import { connect } from 'react-redux';

import { clearCart, fetchFuturePickupEvents } from '../storeActions';
import { CartItem } from '../../types';

import PageLayout from '../../layout/containers/PageLayout';
import CheckoutPage from '../components/CheckoutPage';

type CheckoutPageContainerProps = {
  cart: CartItem[];
};

const CheckoutPageContainer: React.FC<CheckoutPageContainerProps> = ({ cart }) => {
  return (
    <PageLayout>
      <CheckoutPage cart={cart} getFuturePickup={fetchFuturePickupEvents} clearCart={clearCart} />
    </PageLayout>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({ cart: Object.values(state.store.cart) as CartItem[] });

export default connect(mapStateToProps)(CheckoutPageContainer);
