import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';

import { PublicMerchItem, PublicMerchItemOption } from '../../../types';
import { addToCart } from '../../storeActions';

import OptionSelector from '../OptionSelector';
import StoreButton from '../StoreButton';

import './style.less';
import StoreHeader from '../StoreHeader';
import StoreDropdown from '../StoreDropdown';

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

  return (
    <>
      <StoreHeader breadcrumb breadcrumbTitle="Shopping" breadcrumbLocation="/store" showBalance showCart />
      <div className="item-page">
        <img className="item-image" src={picture} alt={description} />
        <div className="item-contents">
          <h2 className="item-name">{itemName}</h2>
          <p className="item-description">{description}</p>
          {options.length > 1 && (
            <div className="item-option">
              <p className="item-option-header">{`${options[0].metadata ? options[0].metadata.type : ''}:`.toLocaleLowerCase()}</p>
              <OptionSelector
                options={options.map((option) => {
                  const { uuid: key, metadata } = option;
                  return { key, label: metadata ? metadata.value : '', value: option };
                })}
                onChange={({ value }: { value: PublicMerchItemOption }) => {
                  setCurrentOption(value);
                }}
              />
            </div>
          )}
          <div className="item-bottom">
            <div className="item-quantity">
              <p className="item-quantity-header">Quantity:</p>
              <StoreDropdown
                options={Array.from(Array(Math.min(item.monthlyLimit, item.lifetimeLimit)).keys()).map((number) => (number + 1).toString())}
                value={(1).toString()}
              />
            </div>
            <StoreButton
              type="primary"
              size="medium"
              text="Add to Cart"
              onClick={() => {
                props.addToCart({ item, option: currentOption, quantity: currentQuantity });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { addToCart })(ItemPage);
