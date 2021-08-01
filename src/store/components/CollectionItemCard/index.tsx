import React from 'react';

import './style.less';
import { useHistory } from 'react-router';

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
  picture: string;
  description: string;
  hidden: boolean;
  // then is set to true, otherwise false
  options: MerchandiseItemOptionModelProps[];
}

interface MerchandiseItemOptionModelProps {
  quantity: number;
  price: number;
  discountPercentage: number;
  type: string; // e.g. 'size', 'shape'
  value: string; // e.g. 'S', 'M', 'L' if this.type === 'size'
  position: number; // e.g. 0, 1, 2 (for sort order, i.e. XS < S < M < L < XL etc)
}

const CollectionItemCard: React.FC<MerchandiseItemModel> = (props: MerchandiseItemModel) => {
  const { uuid, itemName, description, hidden, options, picture } = props;

  const history = useHistory();

  if (hidden) {
    return null;
  }

  const outOfStock = options.every((option) => option.quantity === 0);
  const onSale = options.some((option) => option.discountPercentage !== 0);
  const priceRange = options.reduce(
    (acc, option) => {
      const newAcc = acc;
      if (acc.low > option.price) {
        newAcc.low = option.price;
      } else if (acc.high < option.price) {
        newAcc.high = option.price;
      }
      return newAcc;
    },
    {
      low: Number.POSITIVE_INFINITY,
      high: Number.NEGATIVE_INFINITY,
    },
  );

  const cheapestSalePriceTuple = options.reduce(
    (acc, option) => {
      const currentOptionDiscountPrice = ((100 - option.discountPercentage) * option.price) / 100;
      return acc.salePrice > currentOptionDiscountPrice
        ? {
            normalPrice: option.price,
            salePrice: currentOptionDiscountPrice,
          }
        : acc;
    },
    {
      normalPrice: Infinity,
      salePrice: Infinity,
    },
  );

  const itemPrice = () => {
    if (outOfStock) {
      return <h2 className="out-of-stock-text">Out of stock</h2>;
    }
    if (onSale) {
      if (cheapestSalePriceTuple.normalPrice === cheapestSalePriceTuple.salePrice) {
        return <p className="new-price">{cheapestSalePriceTuple.normalPrice}</p>;
      }
      return (
        <>
          <p className="old-price">{cheapestSalePriceTuple.normalPrice}</p>
          <p className="new-price">{cheapestSalePriceTuple.salePrice}</p>
        </>
      );
    }
    if (priceRange.low === priceRange.high) {
      return <p>{priceRange.low}</p>;
    }
    return (
      <p>
        {priceRange.low} - {priceRange.high}
      </p>
    );
  };

  return (
    <div className="item-card" onClick={() => history.push(`/store/item/${uuid}`)}>
      <div className={outOfStock ? 'out-of-stock item-icon' : 'item-icon'}>
        <img src={picture} alt={description} className={outOfStock ? 'transparent item-image' : 'item-image'} />
      </div>
      <h2>{itemName}</h2>
      <div className="item-information">
        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="12.8328" height="12.8328" rx="2" transform="matrix(0.73475 -0.678337 0.73475 0.678337 0 8.83374)" fill="#62B0FF" />
        </svg>
        {itemPrice()}
      </div>
    </div>
  );
};

export default CollectionItemCard;
