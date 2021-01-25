import React from 'react';
import Icon from '@ant-design/icons';

import './style.less';
import { ReactComponent as SwagIcon } from '../../assets/icons/swag-icon.svg';

const StorePage: React.FC = () => {
  return (
    <div className="store-page">
      <h1>ACM Store</h1>
      <div className="coming-soon">
        <Icon className="temp-icon" component={SwagIcon} />
        <p>Coming Fall 2021!</p>
      </div>
    </div>
  );
};

export default StorePage;
