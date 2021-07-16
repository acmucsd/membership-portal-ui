import React from 'react';

import './style.less';

interface ItemCardProps {
  onSale: boolean;
  outOfStock: boolean;
}

const ItemCard: React.FC<ItemCardProps> = (props: ItemCardProps) => {
  const { onSale, outOfStock } = props;

  const itemPrice = () => {
    if (outOfStock) {
      return <h2 className="out-of-stock-text">Out of stock</h2>;
    } else if (onSale) {
      return (
        <>
          <p className="old-price">5,000</p>
          <p className="new-price">300</p>
        </>
      );
    }
    return <p>5,000</p>;
  };

  return (
    <div className="item-card">
      <div className={outOfStock ? 'out-of-stock item-icon' : 'item-icon'}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="tshirt"
          className="svg-inline--fa fa-tshirt fa-w-20"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path
            fill="currentColor"
            d="M631.2 96.5L436.5 0C416.4 27.8 371.9 47.2 320 47.2S223.6 27.8 203.5 0L8.8 96.5c-7.9 4-11.1 13.6-7.2 21.5l57.2 114.5c4 7.9 13.6 11.1 21.5 7.2l56.6-27.7c10.6-5.2 23 2.5 23 14.4V480c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V226.3c0-11.8 12.4-19.6 23-14.4l56.6 27.7c7.9 4 17.5.8 21.5-7.2L638.3 118c4-7.9.8-17.6-7.1-21.5z"
          />
        </svg>
      </div>
      <h2>Winter Wonder Tee</h2>
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
