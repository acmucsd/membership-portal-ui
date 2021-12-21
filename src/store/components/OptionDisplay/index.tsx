import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';

import { deleteItemOption } from '../../storeActions';
import { Uuid } from '../../../types';

import StoreButton from '../StoreButton';
import StoreTextInput from '../StoreTextInput';

import './style.less';

const columns = [
  ['Category Values', 'value'],
  ['Price', 'price'],
  ['Quantity', 'quantity'],
  ['Discount Percentage', 'discountPercentage'],
].map(([title, dataIndex]) => ({ title, dataIndex }));

interface Option {
  uuid?: Uuid;
  value: string;
  price: string;
  quantity: string;
  discountPercentage: string;
}

interface OptionDisplayProps {
  options: Option[];
  creatingItem: boolean;
  onChange: Function;
  deleteItemOption: Function;
}

const OptionDisplay: React.FC<OptionDisplayProps> = (props) => {
  const { options, creatingItem, onChange } = props;

  const newOptions = [...options];

  const renderValue = (value: string, option: Option, index: number) => (
    <>
      <StoreTextInput
        size="Half"
        value={value}
        onChange={(e) => {
          newOptions[index] = { ...option, value: e.target.value };
          onChange(newOptions);
        }}
      />
      <button
        className="options-display-remove"
        type="button"
        onClick={() => {
          if (creatingItem) {
            newOptions.splice(index, 1);
            onChange(newOptions);
          } else {
            props.deleteItemOption(option.uuid).then(() => {
              newOptions.splice(index, 1);
              onChange(newOptions);
            });
          }
        }}
      >
        Remove
      </button>
    </>
  );
  const renderPrice = (price: string, option: Option, index: number) => (
    <StoreTextInput
      size="Quarter"
      value={price}
      onChange={(e) => {
        newOptions[index] = { ...option, price: e.target.value };
        onChange(newOptions);
      }}
    />
  );
  const renderQuantity = (quantity: string, option: Option, index: number) => (
    <StoreTextInput
      size="Quarter"
      value={quantity}
      onChange={(e) => {
        newOptions[index] = { ...option, quantity: e.target.value };
        onChange(newOptions);
      }}
    />
  );
  const renderDiscountPercentage = (discountPercentage: string, option: Option, index: number) => (
    <StoreTextInput
      size="Quarter"
      value={discountPercentage}
      onChange={(e) => {
        newOptions[index] = { ...option, discountPercentage: e.target.value };
        onChange(newOptions);
      }}
    />
  );

  const cartData = options.map((option, index) => {
    return {
      key: `${index}`,
      value: renderValue(option.value, option, index),
      price: renderPrice(option.price, option, index),
      quantity: renderQuantity(option.quantity, option, index),
      discountPercentage: renderDiscountPercentage(option.discountPercentage, option, index),
    };
  });

  return (
    <div className="options-display">
      <Table dataSource={cartData} columns={columns} pagination={false} />
      <div className="options-display-button">
        <StoreButton
          type="secondary"
          size="medium"
          text="Add Option"
          onClick={() => {
            newOptions.push({ value: '', price: '', quantity: '', discountPercentage: '' });
            onChange(newOptions);
          }}
        />
      </div>
    </div>
  );
};

export default connect(null, { deleteItemOption })(OptionDisplay);
