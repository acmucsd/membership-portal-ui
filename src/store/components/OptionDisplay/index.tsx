import React, { useState } from 'react';
import { Modal, Table } from 'antd';
import { Uuid } from '../../../types';
import { notify } from '../../../utils';
import { createItemOption, deleteItemOption } from '../../utils';
import StoreButton from '../StoreButton';
import StoreTextInput from '../StoreTextInput';
import './style.less';

interface Option {
  uuid?: Uuid;
  value: string;
  price: number;
  quantity: number;
  quantityToAdd: string;
  discountPercentage: number;
}

interface OptionDisplayProps {
  options: Option[];
  itemUuid?: string;
  onChange: Function;
  error: any;
  currentType?: string;
}

const OptionDisplay: React.FC<OptionDisplayProps> = (props) => {
  const { options, itemUuid, onChange, error, currentType } = props;
  const [creatingOption, setCreatingOption] = useState<boolean>(false);
  const [newValue, setNewValue] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDiscountPercentage, setNewDiscountPercentage] = useState('');

  const creatingItem = !itemUuid;

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
        error={error && error[index] && error[index].value}
      />
      <button
        className="options-display-remove"
        type="button"
        onClick={() => {
          if (creatingItem) {
            newOptions.splice(index, 1);
            onChange(newOptions);
          } else {
            deleteItemOption(option.uuid ?? '')
              .then(() => {
                newOptions.splice(index, 1);
                onChange(newOptions);
              })
              .catch((e) => {
                notify('API Error', e.message);
              });
          }
        }}
      >
        Remove
      </button>
    </>
  );
  const renderPrice = (price: number, option: Option, index: number) => (
    <StoreTextInput
      size="Quarter"
      value={price}
      onChange={(e) => {
        newOptions[index] = { ...option, price: e.target.value };
        onChange(newOptions);
      }}
      error={error && error[index] && error[index].price}
    />
  );

  const renderQuantity = (quantity: number, option: Option, index: number, readOnly: boolean) => {
    if (readOnly) {
      return <p>{quantity}</p>;
    }

    return (
      <StoreTextInput
        size="Quarter"
        value={quantity}
        onChange={(e) => {
          newOptions[index] = { ...option, quantity: e.target.value };
          onChange(newOptions);
        }}
        error={error && error[index] && error[index].quantity}
      />
    );
  };

  const renderQuantityToAdd = (quantityToAdd: string, option: Option, index: number) => {
    return (
      <StoreTextInput
        size="Quarter"
        value={quantityToAdd}
        onChange={(e) => {
          newOptions[index] = { ...option, quantityToAdd: e.target.value };
          onChange(newOptions);
        }}
        error={error && error[index] && error[index].quantityToAdd}
      />
    );
  };

  const renderDiscountPercentage = (discountPercentage: number, option: Option, index: number) => (
    <StoreTextInput
      size="Quarter"
      value={discountPercentage}
      onChange={(e) => {
        newOptions[index] = { ...option, discountPercentage: e.target.value };
        onChange(newOptions);
      }}
      error={error && error[index] && error[index].discountPercentage}
    />
  );

  const cartData = options.map((option, index) => {
    return {
      key: `${index}`,
      value: renderValue(option.value, option, index),
      price: renderPrice(option.price, option, index),
      quantity: renderQuantity(option.quantity, option, index, !creatingItem),
      quantityToAdd: renderQuantityToAdd(option.quantityToAdd ?? '', option, index),
      discountPercentage: renderDiscountPercentage(option.discountPercentage, option, index),
    };
  });

  const creatingColumns = [
    ['Category Values', 'value'],
    ['Price', 'price'],
    ['Quantity', 'quantity'],
    ['Discount Percentage', 'discountPercentage'],
  ].map(([title, dataIndex]) => ({ title, dataIndex }));

  const editingColumns = [
    ['Category Values', 'value'],
    ['Price', 'price'],
    ['Current Quantity', 'quantity'],
    ['Quantity Adjustment', 'quantityToAdd'],
    ['Discount Percentage', 'discountPercentage'],
  ].map(([title, dataIndex]) => ({ title, dataIndex, className: dataIndex }));

  return (
    <>
      <div className="options-display">
        <Table dataSource={cartData} columns={creatingItem ? creatingColumns : editingColumns} pagination={false} />
        <div className="options-display-button">
          <StoreButton
            type="secondary"
            size="medium"
            text="Add Option"
            onClick={() => {
              if (creatingItem) {
                newOptions.push({ value: '', price: 0, quantity: 0, quantityToAdd: '', discountPercentage: 0 });
                onChange(newOptions);
              } else {
                setCreatingOption(true);
              }
            }}
          />
        </div>
      </div>
      <Modal
        visible={creatingOption}
        onCancel={() => setCreatingOption(false)}
        onOk={() => {
          createItemOption({
            uuid: itemUuid ?? '',
            option: {
              quantity: parseInt(newQuantity, 10),
              price: parseInt(newPrice, 10),
              metadata: { type: currentType ?? '', value: newValue, position: options.length },
            },
          })
            .then((newOption) => {
              const { uuid, price, discountPercentage, quantity, metadata: { value = '' } = { value: '' } } = newOption;
              newOptions.push({ uuid, value, price, quantity, quantityToAdd: '0', discountPercentage });
              setNewValue('');
              setNewPrice('');
              setNewDiscountPercentage('');
              setNewQuantity('');
              onChange(newOptions);
              setCreatingOption(false);
            })
            .catch((e) => {
              notify('API Error', e.message);
            });
        }}
      >
        <div className="admin-item-page-form-field">
          <h3 className="admin-item-page-form-field-label">Value:</h3>
          <StoreTextInput size="Quarter" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
        </div>
        <div className="admin-item-page-form-field">
          <h3 className="admin-item-page-form-field-label">Quantity:</h3>
          <StoreTextInput size="Quarter" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} />
        </div>
        <div className="admin-item-page-form-field">
          <h3 className="admin-item-page-form-field-label">Price:</h3>
          <StoreTextInput size="Quarter" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
        </div>
        <div className="admin-item-page-form-field">
          <h3 className="admin-item-page-form-field-label">Discount Percentage:</h3>
          <StoreTextInput size="Quarter" value={newDiscountPercentage} onChange={(e) => setNewDiscountPercentage(e.target.value)} />
        </div>
      </Modal>
    </>
  );
};

export default OptionDisplay;
