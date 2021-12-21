import React from 'react';
import { InputNumber, Table, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import { ReactComponent as DiamondIcon } from '../../../assets/icons/diamond-icon.svg';
import { CartItem, PublicMerchItem } from '../../../types';
import { editInCart } from '../../storeActions';

import CartDisplayRow from './CartDisplayRow';

import './style.less';

const cartColumns = [
  ['', 'itemImage'],
  ['Item', 'item'],
  ['Price', 'price'],
  ['Quantity', 'quantity'],
  ['Total Price', 'totalPrice'],
].map(([title, dataIndex]) => ({ title, dataIndex }));

type CartDisplayProps = {
  writable?: boolean;
  items: CartItem[];
};

const CartDisplay: React.FC<CartDisplayProps> = (props) => {
  const { writable = true, items } = props;
  const dispatch = useDispatch();

  const renderItemImage = (item: PublicMerchItem) => (
    <div className="image-container">
      <img className="image" src={item.picture} alt={item.itemName} />
    </div>
  );

  const renderQuantity = (quantity: number, setQuantity: (q: number) => void) => {
    const onInputNumberChange = (e: any) => {
      if (typeof e === 'number') setQuantity(e);
    };

    if (writable) {
      return <InputNumber defaultValue={quantity} disabled={!writable} min={1} onChange={onInputNumberChange} />;
    }
    return <Typography className="item-quantity">{quantity}</Typography>;
  };

  const renderPrice = (price: number) => {
    return (
      <div className="item-price-container">
        <DiamondIcon className="item-price-icon" />
        <Typography className="item-price">{price.toLocaleString()}</Typography>
      </div>
    );
  };

  const cartData = items.map((cartItem) => {
    const {
      item,
      option: { price, uuid, discountPercentage },
      quantity,
    } = cartItem;
    const setQuantity = (q: number) => dispatch(editInCart({ ...cartItem, quantity: q }));
    const discountedPrice = price * (1 - discountPercentage / 100);
    const totalPrice = quantity * discountedPrice;
    return {
      key: `${uuid}${quantity}`,
      itemImage: renderItemImage(item),
      item: <CartDisplayRow item={cartItem} writable={writable} />,
      price: renderPrice(discountedPrice),
      quantity: renderQuantity(quantity, setQuantity),
      totalPrice: renderPrice(totalPrice),
    };
  });

  return (
    <div className="cart-display">
      <Table dataSource={cartData} columns={cartColumns} pagination={false} />
    </div>
  );
};

export default CartDisplay;
