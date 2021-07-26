import React from 'react';

import './style.less';

type Uuid = string;

interface MerchandiseCollectionModel {
  uuid: Uuid;
  title: string;
  color: string; // hex color used for the title (each collection title has its own text color)
  description: string;
  archived: boolean;
  items: MerchandiseItemModel[];
}

interface MerchandiseItemModel {
  uuid: Uuid;
  itemName: string;
  collection: MerchandiseCollectionModel;
  picture: string;
  description: string;
  monthlyLimit: number;
  lifetimeLimit: number;
  hidden: boolean;
  hasVariantsEnabled: boolean; // if an item has variants (i.e. a shirt with S,M,L sizes),
  // then is set to true, otherwise false
  options: MerchandiseItemOptionModel[];
}

interface MerchandiseItemOptionModel {
  uuid: Uuid;
  item: MerchandiseItemModel;
  quantity: number;
  price: number;
  discountPercentage: number;
  type: string; // e.g. 'size', 'shape'
  value: string; // e.g. 'S', 'M', 'L' if this.type === 'size'
  position: number; // e.g. 0, 1, 2 (for sort order, i.e. XS < S < M < L < XL etc)
}

const ItemCard: React.FC<MerchandiseItemModel> = (props: MerchandiseItemModel) => {
  const { description, options, picture } = props;
  const outOfStock = options.every((option) => option.quantity === 0);
  const onSale = options.some((option) => option.discountPercentage !== 0);
  const cheapestNormalPrice = options.reduce((acc, option) => {
    return acc > option.price ? option.price : acc;
  }, Infinity);

  const cheapestSalePrice = options.reduce((acc, option) => {
    const currentOptionDiscountPrice = ((100 - option.discountPercentage) * option.price) / 100;
    return acc > currentOptionDiscountPrice ? currentOptionDiscountPrice : acc;
  }, Infinity);

  const itemPrice = () => {
    if (outOfStock) {
      return <h2 className="out-of-stock-text">Out of stock</h2>;
    }
    if (onSale) {
      return (
        <>
          <p className="old-price">{cheapestNormalPrice}</p>
          <p className="new-price">{cheapestSalePrice}</p>
        </>
      );
    }
    return <p>{cheapestNormalPrice}</p>;
  };

  return (
    <div className="item-card">
      <div className={outOfStock ? 'out-of-stock item-icon' : 'item-icon'}>
        <img src={picture} alt={description} />
      </div>
      <h2>{description}</h2>
      <div className="item-information">
        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="12.8328" height="12.8328" rx="2" transform="matrix(0.73475 -0.678337 0.73475 0.678337 0 8.83374)" fill="#62B0FF" />
        </svg>
        {itemPrice()}
      </div>
    </div>
  );
};

export default ItemCard;
