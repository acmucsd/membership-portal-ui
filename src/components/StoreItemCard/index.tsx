import React from 'react';
import { ReactComponent as Diamond } from '../../assets/icons/Diamond.svg';
import CatBread from '../../assets/icons/cat_bread.jpg';

import './style.less';

const ItemCard: React.FC = () => {
  return (
    <div className="item-card">
      <div className="inside-rectangle">
        <div className="rectangle top" />
        <div className="rectangle bottom" />
        <div className="image-container">
          <img className="image" src={CatBread} alt="Lorem Ipsum" />
        </div>
      </div>
      <div className="info">
        <p className="title">Cat Bread</p>
        <div className="price">
          <Diamond />
          <p className="amount">5,000</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
