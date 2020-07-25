import React from 'react';

import StoreCollectionsContainer from '../../containers/StoreCollections';

import './style.less';

const StorePage: React.FC = () => {
  return (
    <div className="store-page">
      <h1>Diamond Outfitters</h1>
      <StoreCollectionsContainer />
    </div>
  );
};

export default StorePage;
