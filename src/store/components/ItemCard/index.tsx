import React from 'react';
import { Link } from 'react-router-dom';

import { PublicMerchItem } from '../../../types';

import DiamondDisplay from '../DiamondDisplay';

import StorePlus from '../../../assets/icons/store-plus-icon.svg';
import EditableIcon from '../../../assets/icons/editable-icon.svg';

import './style.less';

interface ItemCardProps {
  item?: PublicMerchItem;
  editable?: boolean;
  editableLink?: string;
  placeholder?: boolean;
  placeholderLink?: string;
}

const ItemCard: React.FC<ItemCardProps> = (props) => {
  const { item, editable, editableLink = '', placeholder, placeholderLink = '' } = props;

  if (placeholder) {
    return (
      <div className="item-card">
        <Link to={placeholderLink}>
          <div className="item-card-placeholder">
            <img src={StorePlus} alt="Plus" />
          </div>
        </Link>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  const { uuid, itemName, description, options, picture } = item;

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
      return <DiamondDisplay outOfStock />;
    }
    if (onSale) {
      if (cheapestSalePriceTuple.normalPrice === cheapestSalePriceTuple.salePrice) {
        return <DiamondDisplay value={cheapestSalePriceTuple.normalPrice} />;
      }
      return <DiamondDisplay value={cheapestSalePriceTuple.normalPrice} saleValue={cheapestSalePriceTuple.salePrice} />;
    }
    if (priceRange.low === priceRange.high) {
      return <DiamondDisplay value={priceRange.low} />;
    }
    return <DiamondDisplay prefix={`${priceRange.low.toLocaleString('en-US')} - `} value={priceRange.high} />;
  };

  return (
    <div className="item-card">
      <Link to={`/store/item/${uuid}`}>
        <div className={`item-card-contents${outOfStock ? ' out-of-stock' : ''}`}>
          {editable && (
            <Link to={editableLink}>
              <img className="item-card-editable-icon" src={EditableIcon} alt="Editable" />
            </Link>
          )}
          <div className="item-card-image-container">
            <img className="item-card-image" src={picture} alt={description} />
          </div>
          <div className="item-card-name">{itemName}</div>
          {itemPrice()}
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
