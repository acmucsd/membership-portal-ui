import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';

import { PublicMerchItem, PublicMerchItemOption } from '../../../types';
import { addToCart } from '../../storeActions';

import NavigationBar from '../NavigationBar';
import OptionSelector from '../OptionSelector';
import StoreButton from '../StoreButton';

import './style.less';
import CreditsDisplay from '../CreditsDisplay';

const { Option } = Select;

interface ItemPageProps {
  item: PublicMerchItem | undefined;
  addToCart: Function;
}

const ItemPage: React.FC<ItemPageProps> = (props) => {
  const { item } = props;

  const [currentOption, setCurrentOption] = useState<PublicMerchItemOption>();
  const [currentQuantity, setCurrentQuantity] = useState<number>(1);

  if (!item) {
    return null;
  }

  const { itemName, description, options, picture } = item;

  let itemPrice;

  if (options.length === 1) {
    itemPrice = options[0].price;
  }

  return (
    <>
      <NavigationBar />
      <div className="item-page">
        <img className="item-image" src={picture} alt={description} />
        <div className="item-contents">
          <h2 className="item-name">{itemName}</h2>
          {itemPrice && <CreditsDisplay value={itemPrice} />}
          <p className="item-description">{description}</p>
          {options.length > 1 && (
            <div className="item-option">
              <p className="item-option-header">{options[0].metadata ? options[0].metadata.type : ''}:</p>
              <OptionSelector
                options={options.map((option) => {
                  return { key: option.uuid, value: option.metadata ? option.metadata.value : '' };
                })}
                optionSelected={(option) => {
                  setCurrentOption(option.key);
                }}
              />
            </div>
          )}
          <div className="item-bottom">
            <div className="item-quantity">
              <p className="item-quantity-header">Quantity:</p>
              <Select
                defaultValue={1}
                className="item-quantity-selector"
                onSelect={(option) => {
                  setCurrentQuantity(Number.parseInt(option, 10));
                }}
              >
                <Option key="1">1</Option>
                <Option key="2">2</Option>
                <Option key="3">3</Option>
                <Option key="4">4</Option>
                <Option key="5">5</Option>
              </Select>
            </div>
            <StoreButton
              text="Add to Cart"
              onClick={() => {
                props.addToCart(currentOption, currentQuantity);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { addToCart })(ItemPage);