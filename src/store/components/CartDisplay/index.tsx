import { Button, InputNumber, Select, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as DiamondIcon } from '../../../assets/icons/diamond-icon.svg';
import { editInCart } from '../../storeActions';
import { CartItem, PublicMerchItem } from '../../../types';
import './style.less';

const cartColumns = [
  ['', 'itemImage'],
  ['Item', 'item'],
  ['Price', 'price'],
  ['Quantity', 'quantity'],
  ['Total Price', 'totalPrice'],
].map(([title, dataIndex]) => ({ title, dataIndex }));

type CartItemProps = {
  item: CartItem;
  writable: boolean;
};
const CartItem: React.FC<CartItemProps> = ({ item, writable }) => {
const CartItemComponent: React.FC<CartItemProps> = ({ item, writable }) => {
  const [editable, setEditable] = useState(false);
  const { Option } = Select;

  const renderTitle = () => (
    <Typography.Title className="item-name" level={4}>
      {item.item.itemName}
    </Typography.Title>
  );

  const renderColor = () => (
    <div className="item-color-container">
      <Typography.Text className="item-color-label">Color: </Typography.Text>
      <Typography.Text className="item-color">{item.item.collection.themeColorHex}</Typography.Text>
    </div>
  );

  const toProperCase = (s: string) => {
    return s
      .split(' ')
      .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  const renderVariant = () => {
    if (item.item.hasVariantsEnabled && item.option.metadata) {
      return (
        <div className="item-size-container">
          <Typography.Text className="item-size-label">{toProperCase(item.option.metadata.type)}: </Typography.Text>
          {editable ? (
            <Select defaultValue={item.option.metadata.value}>
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
    }
    return null;
  };

  const renderButtons = () => {
    if (writable) {
      return (
        <>
          {item.item.options.length > 1 && (
            <Button className="item-button edit-button" type="link" onClick={() => setEditable((e) => !e)}>
              {editable ? 'Done' : 'Edit'}
            </Button>
          )}
          <Button className="item-button remove-button" type="link" disabled={!writable}>
            Remove
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <div className="cart-item">
      {renderTitle()}
      {renderColor()}
      {renderVariant()}
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
      option: { price, uuid },
      quantity,
    } = cartItem;
    const setQuantity = (q: number) => dispatch(editInCart({ ...cartItem, quantity: q }));
    return {
      key: uuid,
      itemImage: renderItemImage(item),
      item: <CartItemComponent item={cartItem} writable={writable} />,
      price: renderPrice(price),
      quantity: renderQuantity(quantity, setQuantity),
      totalPrice: renderPrice(price * quantity),
    };
  });

  return (
    <div className="cart-display">
      <Table dataSource={cartData} columns={cartColumns} pagination={false} />
    </div>
  );
};

export default CartDisplay;
