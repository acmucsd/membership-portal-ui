import React from 'react';
import { Table, Typography } from 'antd';

import { PublicOrderItem, PublicOrderItemWithQuantity } from '../../../types';
import { toProperCase } from '../../../utils';

import DiamondDisplay from '../DiamondDisplay';

import './style.less';

const orderColumns = [
  ['', 'itemImage'],
  ['Item', 'item'],
  ['Price', 'price'],
  ['Quantity', 'quantity'],
  ['Total Price', 'totalPrice'],
].map(([title, dataIndex]) => ({ title, dataIndex, className: dataIndex }));

type OrderItemProps = {
  itemName: string;
  optionType?: string;
  optionValue?: string;
};
const OrderItemComponent: React.FC<OrderItemProps> = (props) => {
  const { itemName, optionType, optionValue } = props;

  const renderTitle = () => (
    <Typography.Title className="item-name" level={4}>
      {itemName}
    </Typography.Title>
  );

  const renderOption = () => {
    if (!optionType || !optionValue) return null;

    return (
      <div className="item-option-container">
        <Typography.Text className="item-option-label">{toProperCase(optionType)}: </Typography.Text>
        <Typography.Text className="item-option">{optionValue}</Typography.Text>
      </div>
    );
  };

  return (
    <div className="order-item">
      {renderTitle()}
      {renderOption()}
    </div>
  );
};

interface OrderDisplayProps {
  items: PublicOrderItem[];
}

const OrderDisplay: React.FC<OrderDisplayProps> = (props) => {
  const { items } = props;

  const renderItemImage = (picture: string, itemName: string) => (
    <div className="image-container">
      <img className="image" src={picture} alt={itemName} />
    </div>
  );

  const renderQuantity = (quantity: number) => {
    return <Typography className="item-quantity">{quantity}</Typography>;
  };

  const renderPrice = (price: number, discountPercentage: number) => {
    return <DiamondDisplay value={price} saleValue={price * (1 - discountPercentage / 100)} />;
  };

  const itemMap = new Map<string, PublicOrderItemWithQuantity>();

  items.forEach((item) => {
    const existingItem = itemMap.get(item.option.uuid);

    if (existingItem) {
      existingItem.quantity += 1;

      itemMap.set(existingItem.option.uuid, existingItem);
    } else {
      itemMap.set(item.option.uuid, { ...item, quantity: 1 });
    }
  });

  const updatedItems = Array.from(itemMap, ([, value]) => value);

  const orderData = updatedItems.map((orderItem) => {
    const picture = orderItem.option.item.uploadedPhoto;
    const {
      uuid,
      option: {
        item: { itemName },
        metadata,
      },
      quantity,
      salePriceAtPurchase: salePrice,
      discountPercentageAtPurchase: discountPercentage,
    } = orderItem;

    const price = salePrice / (1 - discountPercentage / 100);

    return {
      key: uuid,
      itemImage: renderItemImage(picture, itemName),
      item: <OrderItemComponent itemName={itemName} optionType={metadata?.type} optionValue={metadata?.value} />,
      price: renderPrice(price, discountPercentage),
      quantity: renderQuantity(quantity),
      totalPrice: renderPrice(quantity * price, discountPercentage),
    };
  });

  const fullTotal = updatedItems.reduce((sum, { option: { price }, quantity }) => sum + price * quantity, 0);
  const discountedTotal = updatedItems.reduce((sum, { salePriceAtPurchase, quantity }) => sum + salePriceAtPurchase * quantity, 0);

  return (
    <div className="order-display">
      <Table dataSource={orderData} columns={orderColumns} pagination={false} />
      <div className="order-display-total">
        <p className="order-display-total-text">Total:</p>
        {discountedTotal < fullTotal ? <DiamondDisplay value={fullTotal} saleValue={discountedTotal} /> : <DiamondDisplay value={fullTotal} />}
      </div>
    </div>
  );
};

export default OrderDisplay;
