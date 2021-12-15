import React, { useState } from 'react';
import { connect } from 'react-redux';

import { PublicMerchItem, PublicMerchItemOption } from '../../../types';
import { addToCart } from '../../storeActions';

import StoreHeader from '../StoreHeader';
import DiamondDisplay from '../DiamondDisplay';
import OptionSelector from '../OptionSelector';
import StoreDropdown from '../StoreDropdown';
import StoreButton from '../StoreButton';

import './style.less';

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

  let limitMessage;

  if (!item.monthlyLimit && !item.lifetimeLimit) {
    limitMessage = '';
  } else if ((item.monthlyLimit && item.monthlyLimit < item.lifetimeLimit) || (item.monthlyLimit && !item.lifetimeLimit)) {
    limitMessage = `You can buy up to ${item.monthlyLimit} of this item this month.`;
  } else {
    limitMessage = `You can buy up to ${item.monthlyLimit} of this item.`;
  }

  return (
    <>
      <StoreHeader breadcrumb breadcrumbTitle="Shopping" breadcrumbLocation="/store" showBalance showCart />
      <div className="item-page">
        <div className="item-image-container">
          <img className="item-image" src={picture} alt={description} />
        </div>
        <div className="item-contents">
          <h2 className="item-name">{itemName}</h2>
          <DiamondDisplay value={1000} />
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
          <p className="item-limit">{limitMessage}</p>
        </div>
      </div>
    </>
  );
};

export default connect(null, { addToCart })(ItemPage);
