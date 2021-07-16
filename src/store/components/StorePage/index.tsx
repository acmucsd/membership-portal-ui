import React from 'react';
import Icon from '@ant-design/icons';

import ItemCard from '../ItemCard';

import './style.less';

const StorePage: React.FC = () => {
  return (
    <div className="store-page">
      <h1>ACM Store</h1>
      <div className="item-card-holder">
        <ItemCard onSale={false} outOfStock={false} />
        <ItemCard onSale outOfStock={false} />
        <ItemCard onSale={false} outOfStock />
      </div>
    </div>
  );
};

export default StorePage;
