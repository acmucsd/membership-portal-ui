import React from 'react';
import { ReactComponent as Diamond } from '../../assets/icons/Diamond.svg';
import CatBread from '../../assets/icons/cat_bread.jpg';

import './style.less';

interface StoreItemCardProps {
  merchandise: {
    collection: string;
    description: string;
    discountPercentage: number;
    itemName: string;
    lifetimeLimit: number;
    monthlyLimit: number;
    picture: string;
    price: number;
    uuid: string;
  };
}

const ItemCard: React.FC<StoreItemCardProps> = (props) => {
  const { merchandise } = props;
  return (
    <div className="item-card">
      <div className="inside-rectangle">
        <div className="rectangle top" />
        <div className="rectangle bottom" />
        <div className="image-container">
          <img
            className="image"
            src={merchandise.picture !== undefined ? merchandise.picture : CatBread}
            alt="Image of {merchandise.itemName}"
          />
        </div>
      </div>
      <div className="info">
        <p className="title">{merchandise.itemName}</p>
        <div className="price">
          <Diamond />
          <p className="amount">{merchandise.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
