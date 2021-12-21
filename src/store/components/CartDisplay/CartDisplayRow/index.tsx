import { Button, Select, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { CartItem } from '../../../../types';
import { addToCart, editInCart, removeFromCart } from '../../../storeActions';

import './style.less';

const { Option } = Select;

const toProperCase = (s: string) => {
  return s
    .split(' ')
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

type CartDisplayRowProps = {
  item: CartItem;
  writable: boolean;
};

const CartDisplayRow: React.FC<CartDisplayRowProps> = ({ item, writable }) => {
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
      <div className="item-size-container">
        <Typography.Text className="item-size-label">{toProperCase(item.option.metadata.type)}: </Typography.Text>
        {editable ? (
          <Select defaultValue={item.option.metadata.value} onChange={setVariant}>
            {item.item.options.map((opt) => (
              <Option key={opt.metadata?.value} value={opt.metadata?.value}>
                {opt.metadata?.value}
              </Option>
            ))}
          </Select>
        ) : (
          <Typography.Text className="item-size">{item.option.metadata.value}</Typography.Text>
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
        <Button className="item-button remove-button" type="link" onClick={removeItem} disabled={!writable}>
          Remove
        </Button>
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

export default CartDisplayRow;
