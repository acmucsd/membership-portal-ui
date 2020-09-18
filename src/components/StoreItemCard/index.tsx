import React from 'react';
import { ReactComponent as Diamond } from '../../assets/icons/Diamond.svg';
import CatBread from '../../assets/icons/cat-bread.jpg';

import './style.less';

interface StoreItemCardProps {
  item: {
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
  const { item } = props;
  return (
    <div className="item-card">
      <div className="inside-rectangle">
        <div className="rectangle top" />
        <div className="rectangle bottom" />
        <div className="image-container">
          <img
            className="image"
            src={item.picture !== undefined ? item.picture : CatBread}
            alt="Image of {item.itemName}"
          />
        </div>
      </div>
      <div className="info">
        <p className="title">{item.itemName}</p>
        <div className="price">
          <Diamond />
          <p className="amount">{item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
