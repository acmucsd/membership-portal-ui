import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CheckoutCart from '../../components/StorePage/CheckoutCart';

const initialStateCheckoutCartState = {
  cart: {
    items: [
      {
        name: 'Whole Wheat Bread',
        quantity: 3,
        id: 'abcdef',
        price: 250,
        image:
          'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2019/11/homemade-sandwich-bread-600x900.jpg',
      },
      {
        name: 'Better Whole Wheat Bread',
        quantity: 1,
        id: 'defasd',
        price: 4000,
        image:
          'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2019/11/homemade-sandwich-bread-600x900.jpg',
      },
    ],
  },
};

const CheckoutCartContainer = ({ store }) => {
  useEffect(() => {}, [store]);
  return <CheckoutCart store={initialStateCheckoutCartState} />;
};

const mapStateToProps = (state) => ({
  store: state.store,
});
export default connect(mapStateToProps, {})(CheckoutCartContainer);
