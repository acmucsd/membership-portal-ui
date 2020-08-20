import React from 'react';

import StoreCollectionsContainer from '../../containers/StoreCollections';

import './style.less';
import CheckoutCart from '../../containers/store/CheckoutCart';

const StorePage: React.FC = () => {
  return (
    <div className="store-page">
      <h1>ACM Store</h1>
      <CheckoutCart />
      <h1>Diamond Outfitters</h1>
      <StoreCollectionsContainer />
    </div>
  );
};

export default StorePage;
