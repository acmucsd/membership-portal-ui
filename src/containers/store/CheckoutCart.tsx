import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CheckoutCart from '../../components/StorePage/CheckoutCart';

const CheckoutCartContainer = ({ store }) => {
  useEffect(() => {}, [store]);
  return <CheckoutCart store={store} />;
};

const mapStateToProps = (state) => ({
  store: state.store,
});
export default connect(mapStateToProps, {})(CheckoutCartContainer);
