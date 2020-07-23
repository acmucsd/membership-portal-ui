import React from 'react';
import Icon from '@ant-design/icons';

import StoreCollectionsContainer from '../../containers/StoreCollections';

import './style.less';
import { ReactComponent as SwagIcon } from '../../assets/icons/swag-icon.svg';

const StorePage: React.FC = () => {
  return (
    <div className="store-page">
      <h1>Diamond Outfitters</h1>
      <StoreCollectionsContainer/>
    </div>
  );
};

export default StorePage;
