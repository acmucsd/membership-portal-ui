import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CheckoutCart from '../../components/StorePage/CheckoutCart';

const CheckoutCartContainer = (props) => {
  useEffect(() => {}, [props.store]);
  return <CheckoutCart store={props.store} />;
};

const mapStateToProps = (state) => ({
  store: state.store,
});
export default connect(mapStateToProps, {})(CheckoutCartContainer);
