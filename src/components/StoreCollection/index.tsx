import React from 'react';

import ItemCard from '../StoreItemCard';

import './style.less';

interface StoreCollectionProps {
  auth: {
    admin: boolean;
  };
  uuid: string;
  description: string;
  title: string;
  merchandise: [
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
  const { description, title, merchandise } = props;
  return (
    <div className="collection">
      <div className="collection-info">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {merchandise.map((item, i) => (
        <ItemCard key={item.itemName} />
      ))}
    </div>
  );
};

export default StoreCollection;
