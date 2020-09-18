import React from 'react';

import ItemCard from '../StoreItemCard';

import './style.less';

interface StoreCollectionProps {
  auth: any;
  uuid: string;
  description: string;
  title: string;
  items: [
    {
      collection: string;
      description: string;
      discountPercentage: number;
      itemName: string;
      lifetimeLimit: number;
      monthlyLimit: number;
      picture: string;
      price: number;
      uuid: string;
    },
  ];
}

const StoreCollection: React.FC<StoreCollectionProps> = (props) => {
  const { description, title, items } = props;

  return (
    <div className="collection">
      <div className="collection-info">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {items.map((item) => (
        <ItemCard item={item} />
      ))}
    </div>
  );
};

export default StoreCollection;
