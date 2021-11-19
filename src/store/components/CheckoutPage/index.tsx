import React from 'react';
import { connect } from 'react-redux';
import CartDisplay from '../CartDisplay';
import NavigationBar from '../NavigationBar';

const CheckoutPage: React.FC = (props) => {
  return (
    <div className="cart-page">
      {JSON.stringify(props)}
      <NavigationBar />
      <CartDisplay items={[]} />
    </div>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  error: state.store.error,
  cart: state.store.cart,
});

export default connect(mapStateToProps)(CheckoutPage);