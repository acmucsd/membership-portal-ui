import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const ItemCard = () => {
  return (
    <div className="item-card">
      <div className="inside-rectangle">
          <div className ="rectangle top"></div>
          <div className ="rectangle bottom"></div>
          <div className="image-container">
            <img className="image" src="./cat-bread.jpg" alt="Lorem Ipsum"/>
          </div>
      </div>
      <div className="info">
        <p className="title">Cat Bread</p>
        <div className="price">
          <img className="diamond" src="Diamond.png" alt=""/>
          <p clasName="amount">5,000</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
