import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Select } from 'antd';

import { MerchandiseItemModel } from '../../../types';
import { addToCart } from '../../storeActions';

import NavigationBar from '../NavigationBar';
import OptionSelector from '../OptionSelector';
import StoreButton from '../StoreButton';

import './style.less';
import CreditsDisplay from '../CreditsDisplay';

const { Option } = Select;

interface ItemPageProps {
  item: MerchandiseItemModel | undefined;
  addToCart: Function;
}

const ItemPage: React.FC<ItemPageProps> = (props) => {
  const { item } = props;
  const history = useHistory();

  const [currentOption, setCurrentOption] = useState<string>();
  const [currentQuantity, setCurrentQuantity] = useState<number>(1);

  const [itemPrice /* , setItemPrice */] = useState<number>();

  if (!item) {
    return null;
  }

  const { itemName, description, hidden, options, picture } = item;

  if (hidden) {
    history.push('/store');
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
              <p className="item-option-header">Option:</p>
              <OptionSelector
                options={[
                  { key: 'S', value: 'Small' },
                  { key: 'M', value: 'Medium' },
                  { key: 'L', value: 'Large' },
                ]}
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
