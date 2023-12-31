import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Select, Table, Typography } from 'antd';

import { CartItem, PublicMerchItem, PublicMerchItemOption } from '../../../types';
import { getDefaultMerchItemPicture, toProperCase } from '../../../utils';
import { addToCart, editInCart, removeFromCart } from '../../storeActions';

import './style.less';
import DiamondDisplay from '../DiamondDisplay';
import StoreDropdown from '../StoreDropdown';

const { Option } = Select;

const cartColumns = [
  ['', 'itemImage'],
  ['Item', 'item'],
  ['Price', 'price'],
  ['Quantity', 'quantity'],
  ['Total Price', 'totalPrice'],
].map(([title, dataIndex]) => ({ title, dataIndex, className: dataIndex }));

type CartItemProps = {
  item: CartItem;
  writable: boolean;
};
const CartItemComponent: React.FC<CartItemProps> = ({ item, writable }) => {
  const [editable, setEditable] = useState(false);
  const [currentOptionValue, setVariant] = useState(item.option?.metadata?.value);
  const dispatch = useDispatch();

  const renderTitle = () => (
    <Typography.Title className="item-name" level={4}>
      {item.item.itemName}
    </Typography.Title>
  );

  const renderOption = () => {
    if (!item.option.metadata) return null;

    return (
      <div className="item-option-container">
        <Typography.Text className="item-option-label">{toProperCase(item.option.metadata.type)}: </Typography.Text>
        {editable ? (
          <Select defaultValue={item.option.metadata.value} onChange={setVariant}>
            {item.item.options.map((opt) => (
              <Option key={opt.metadata?.value} value={opt.metadata?.value}>
                {opt.metadata?.value}
              </Option>
            ))}
          </Select>
        ) : (
          <Typography.Text className="item-option">{item.option.metadata.value}</Typography.Text>
        )}
      </div>
    );
  };

  const changeOption = () => {
    if (!item.option.metadata) return;

    if (editable) {
      if (currentOptionValue !== item.option.metadata.value) {
        const { quantity } = item;
        const newOption = item.item.options.find((opt) => opt?.metadata?.value === currentOptionValue);

        dispatch(editInCart({ ...item, quantity: 0 }));
        dispatch(addToCart({ ...item, option: newOption, quantity }));
      }
      setEditable(false);
    } else {
      setEditable(true);
    }
  };

  const renderButtons = () => {
    const removeItem = () => {
      dispatch(removeFromCart(item));
    };

    const renderEditButton = () => {
      if (!item.option.metadata) return null;

      return (
        <Button className="item-button edit-button" type="link" onClick={changeOption}>
          {editable ? 'Done' : 'Edit'}
        </Button>
      );
    };

    if (!writable) return null;

    return (
      <>
        {renderEditButton()}
        {editable ? (
          <Button
            className="item-button remove-button"
            type="link"
            onClick={() => {
              setEditable(false);
            }}
            disabled={!writable}
          >
            Cancel
          </Button>
        ) : (
          <Button className="item-button remove-button" type="link" onClick={removeItem} disabled={!writable}>
            Remove
          </Button>
        )}
      </>
    );
  };

  return (
    <div className="cart-item">
      {renderTitle()}
      {renderOption()}
      {renderButtons()}
    </div>
  );
};

type CartDisplayProps = {
  writable?: boolean;
  items: CartItem[];
};
const CartDisplay: React.FC<CartDisplayProps> = (props) => {
  const { writable = true, items } = props;
  const dispatch = useDispatch();

  const renderItemImage = (item: PublicMerchItem) => (
    <div className="image-container">
      <img className="image" src={getDefaultMerchItemPicture(item)} alt={item.itemName} />
    </div>
  );

  const renderQuantity = (item: PublicMerchItem, quantity: number, setQuantity: (q: number) => void) => {
    if (writable) {
      return (
        <StoreDropdown
          options={Array.from(Array(Math.min(item.monthlyLimit, item.lifetimeLimit)).keys()).map((number) => (number + 1).toString())}
          value={quantity.toString()}
          onChange={(option) => {
            setQuantity(Number.parseInt(option.value, 10));
          }}
        />
      );
    }
    return <Typography className="item-quantity">{quantity}</Typography>;
  };

  const renderPrice = (price: number, discountPercentage: number) => {
    return <DiamondDisplay value={price} saleValue={price * (1 - discountPercentage / 100)} />;
  };

  const cartData = items.map((cartItem) => {
    const {
      item,
      option: { price, uuid, discountPercentage },
      quantity,
    } = cartItem;

    const setQuantity = (q: number) => dispatch(editInCart({ ...cartItem, quantity: q }));

    return {
      key: uuid,
      itemImage: renderItemImage(item),
      item: <CartItemComponent item={cartItem} writable={writable} />,
      price: renderPrice(price, discountPercentage),
      quantity: renderQuantity(item, quantity, setQuantity),
      totalPrice: renderPrice(quantity * price, discountPercentage),
    };
  });

  const total = items.reduce((sum, { option, quantity }) => sum + option.price * quantity, 0);

  const getDiscountedPrice = ({ price, discountPercentage }: PublicMerchItemOption) => price * (1 - discountPercentage / 100);
  const discountedTotal = items.reduce((sum, { option, quantity }) => sum + getDiscountedPrice(option) * quantity, 0);

  return (
    <div className="cart-display">
      <Table dataSource={cartData} columns={cartColumns} pagination={false} />
      <div className="cart-display-total">
        <p className="cart-display-total-text">Total:</p>
        {discountedTotal < total ? <DiamondDisplay value={total} saleValue={discountedTotal} /> : <DiamondDisplay value={total} />}
      </div>
    </div>
  );
};

export default CartDisplay;
