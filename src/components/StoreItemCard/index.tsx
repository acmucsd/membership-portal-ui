import React from 'react';

import './style.less';

const ItemCard: React.FC = () => {
  return (
    <div className="item-card">
      <div className="inside-rectangle">
          <div className ="rectangle top"></div>
          <div className ="rectangle bottom"></div>
          <div className="image-container">
            <img className="image" src="https://raw.githubusercontent.com/acmucsd/membership-portal-ui/1ff907fb5f4e095d2b20a01efa312234717ff1ff/src/components/ItemCard/cat-bread.jpg" alt="Lorem Ipsum"/>
          </div>
      </div>
      <div className="info">
        <p className="title">Cat Bread</p>
        <div className="price">
          <img className="diamond" src="https://raw.githubusercontent.com/acmucsd/membership-portal-ui/1ff907fb5f4e095d2b20a01efa312234717ff1ff/src/components/ItemCard/Diamond.png" alt=""/>
          <p className="amount">5,000</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;