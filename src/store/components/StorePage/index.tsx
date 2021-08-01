import React from 'react';

import CollectionItemCard from '../CollectionItemCard';

import './style.less';

const items = [
  {
    uuid: 'ce16ccf0-3631-4924-9617-a4932d58efbb',
    itemName: 'Spring Teeny Tee',
    hidden: false,
    picture:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    description: 'This is an awesome shirt!',
    options: [
      {
        quantity: 50,
        price: 4000,
        discountPercentage: 0,
        type: 'size',
        value: 'S',
        position: 0,
      },
      {
        quantity: 42,
        price: 5000,
        discountPercentage: 0,
        type: 'size',
        value: 'M',
        position: 1,
      },
      {
        quantity: 6,
        price: 6000,
        discountPercentage: 0,
        type: 'size',
        value: 'L',
        position: 2,
      },
    ],
  },
  {
    uuid: 'bf7e63a0-72c9-43be-ab6c-a0b90b26ff88',
    itemName: 'Cat Mug',
    hidden: false,
    picture:
      'https://images.unsplash.com/photo-1620154562010-bbee2fa05f71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2547&q=80',
    description: 'This is a mug blessed by Godsnu itself. Enjoy.',
    options: [
      {
        quantity: 100,
        price: 2000,
        discountPercentage: 50,
        type: 'color',
        value: 'black',
        position: 0,
      },
      {
        quantity: 50,
        price: 1000,
        discountPercentage: 0,
        type: 'color',
        value: 'red',
        position: 1,
      },
    ],
  },
  {
    uuid: 'd82229f9-65d6-4a94-8c1d-4c15418b69d5',
    itemName: '@everyone Pass',
    hidden: false,
    picture: 'https://i.redd.it/ndozdv59jsx21.png',
    description: "Use this pass to destroy everyone's day on our awesome Discord server. Check it out at acmurl.com/discord",
    options: [
      {
        quantity: 0,
        price: 1000000,
        discountPercentage: 0,
        type: 'amount',
        value: '1',
        position: 0,
      },
    ],
  },
  {
    uuid: 'e346a815-0e8d-48ab-99ed-c8ad9b7921c2',
    itemName: 'Non-Existent Not Done Item',
    hidden: true,
    picture: '',
    description: 'DO NOT BUY THIS! TEST PRODUCT, PLEASE IGNORE.',
    options: [
      {
        quantity: 100,
        price: 1,
        discountPercentage: 0,
        type: 'size',
        value: 'S',
        position: 0,
      },
    ],
  },
];

const StorePage: React.FC = () => {
  return (
    <div className="store-page">
      <h1>ACM Store</h1>
      <div className="item-card-holder">
        {items.map((item) => (
          <CollectionItemCard
            itemName={item.itemName}
            hidden={item.hidden}
            picture={item.picture}
            description={item.description}
            options={item.options}
          />
        ))}
      </div>
    </div>
  );
};

export default StorePage;
