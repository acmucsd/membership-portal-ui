import { Button, InputNumber, Select, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as DiamondIcon } from '../../../assets/icons/diamond-icon.svg';
import { CartItem, PublicMerchItem } from '../../../types';
import { addToCart, editInCart, removeFromCart } from '../../storeActions';
import './style.less';

const { Option } = Select;

const cartColumns = [
  ['', 'itemImage'],
  ['Item', 'item'],
  ['Price', 'price'],
  ['Quantity', 'quantity'],
  ['Total Price', 'totalPrice'],
].map(([title, dataIndex]) => ({ title, dataIndex }));

const toProperCase = (s: string) => {
  return s
    .split(' ')
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

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
      item: <CartItemComponent item={cartItem} writable={writable} />,
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
