import React from 'react';
import Icon from '@ant-design/icons';

import './style.less';
import { ReactComponent as SwagIcon } from '../../assets/icons/swag-icon.svg';

import StoreHeader from '../../containers/StoreHeader';

const StorePage = () => {
  return (
    <div className="store-page">
      <StoreHeader
        titleText="Diamond Outfitter"
        titleType="nav"
        hideCart={false}
      />
      <div className="coming-soon">
        <Icon className="temp-icon" component={SwagIcon} />
        <p>Coming Soon!</p>
      </div>
    </div>
  );
};

export default StorePage;
