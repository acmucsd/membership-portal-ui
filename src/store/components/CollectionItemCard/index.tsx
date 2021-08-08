import React from 'react';
import { useHistory } from 'react-router';

import { MerchandiseItemModel } from '../../../types';
import { ReactComponent as DiamondIcon } from '../../../assets/icons/diamond-icon.svg';

import './style.less';

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
      }
      if (acc.high < option.price) {
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
        return <p className="new-price">{cheapestSalePriceTuple.normalPrice.toLocaleString('en-US')}</p>;
      }
      return (
        <>
          <p className="old-price">{cheapestSalePriceTuple.normalPrice.toLocaleString('en-US')}</p>
          <p className="new-price">{cheapestSalePriceTuple.salePrice.toLocaleString('en-US')}</p>
        </>
      );
    }
    if (priceRange.low === priceRange.high) {
      return <p>{priceRange.low.toLocaleString('en-US')}</p>;
    }
    return (
      <p>
        {priceRange.low.toLocaleString('en-US')} - {priceRange.high.toLocaleString('en-US')}
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
        <DiamondIcon />
        {itemPrice()}
      </div>
    </div>
  );
};

export default CollectionItemCard;
