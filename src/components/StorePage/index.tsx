import React from 'react';

import StoreCollectionsContainer from '../../containers/StoreCollections';

import './style.less';
import CheckoutCart from '../../containers/store/CheckoutCart';
import { ReactComponent as SwagIcon } from '../../assets/icons/swag-icon.svg';

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

const StorePage: React.FC = () => {
  return (
    <div className="store-page">
      <h1>ACM Store</h1>
      <div className="coming-soon">
        <CheckoutCart store={initialStateCheckoutCartState} />
        <Icon className="temp-icon" component={SwagIcon} />
        <p>Coming Soon!</p>
      </div>
      <h1>Diamond Outfitters</h1>
      <StoreCollectionsContainer />
    </div>
  );
};

export default StorePage;
