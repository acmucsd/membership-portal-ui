import React from 'react';
import { Icon } from 'antd';

import './style.less';
import { ReactComponent as SwagIcon } from '../../assets/icons/swag-icon.svg';

const StorePage = props => {
  return (
    <div className="store-page">
      <h1>ACM Store</h1>
      <div className="coming-soon">
        <Icon className="temp-icon" component={SwagIcon} />
        <p>Coming Soon!</p>
      </div>
    </div>
  );
};

export default StorePage;
