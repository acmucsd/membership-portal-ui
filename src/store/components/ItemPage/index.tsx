import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import { PublicMerchItemWithPurchaseLimits, PublicMerchItemOption } from '../../../types';
import { processItem, processItemPrice } from '../../../utils';
import { addToCart } from '../../storeActions';

import StoreHeader from '../StoreHeader';
import OptionSelector from '../OptionSelector';
import StoreDropdown from '../StoreDropdown';
import StoreButton from '../StoreButton';

import './style.less';

interface ItemPageProps {
  item: PublicMerchItemWithPurchaseLimits | undefined;
  addToCart: Function;
}

const ItemPage: React.FC<ItemPageProps> = (props) => {
  const { item } = props;

  const [currentOption, setCurrentOption] = useState<PublicMerchItemOption>();
  const [currentQuantity, setCurrentQuantity] = useState<number>(1);
  const [confirmation, setConfirmation] = useState<boolean>(false);

  if (!item) {
    return null;
  }

  const { outOfStock: itemOutOfStock } = processItem(item.options);
  const itemPrice = processItemPrice(item.options);
  const { outOfStock: optionOutOfStock } = currentOption ? processItem([currentOption]) : { outOfStock: false };
  const itemOptionPrice = currentOption ? processItemPrice([currentOption]) : null;

  const { itemName, description, hasVariantsEnabled, options, picture } = item;

  let limitMessage;

  if (item.monthlyRemaining < item.lifetimeRemaining) {
    limitMessage = `You can buy up to ${item.monthlyLimit} of this item this month.`;
  } else {
    limitMessage = `You can buy up to ${item.lifetimeRemaining} of this item.`;
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
          {currentOption ? itemOptionPrice : itemPrice}
          <p className="item-description">{description}</p>
          {hasVariantsEnabled && (
            <div className="item-option">
              <p className="item-option-header">{`${options[0].metadata ? options[0].metadata.type : ''}:`.toLocaleLowerCase()}</p>
              <OptionSelector
                options={options
                  .sort((a, b) => {
                    if ((a.metadata?.position ?? 0) < (b.metadata?.position ?? 0)) {
                      return -1;
                    }
                    if ((a.metadata?.position ?? 0) > (b.metadata?.position ?? 0)) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((option) => {
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
                onChange={(option) => {
                  setCurrentQuantity(Number.parseInt(option.value, 10));
                }}
              />
            </div>
            <StoreButton
              type="primary"
              size="medium"
              text="Add to Cart"
              disabled={(hasVariantsEnabled && !currentOption) || itemOutOfStock || (currentOption && optionOutOfStock)}
              onClick={() => {
                if (hasVariantsEnabled) {
                  props.addToCart({ item, option: currentOption, quantity: currentQuantity });
                } else {
                  props.addToCart({ item, option: item.options[0], quantity: currentQuantity });
                }
                setConfirmation(true);
              }}
            />
          </div>
          <p className="item-limit">{limitMessage}</p>
        </div>
      </div>
      <Modal
        className="item-page-modal"
        width="23rem"
        visible={confirmation}
        centered
        onCancel={() => {
          setConfirmation(false);
        }}
        afterClose={() => {
          setConfirmation(false);
        }}
        footer={(() => {
          return (
            <>
              <StoreButton type="primary" size="small" text="Continue Shopping" link="/store" />
              <StoreButton type="primary" size="small" text="View Cart" link="/store/cart" />
            </>
          );
        })()}
      >
        <p className="item-page-modal-title">Added to cart</p>
        <div className="item-page-modal-content">
          <img className="item-page-modal-item-image" src={picture} alt={description} />
          <div className="item-page-modal-item-details">
            <p className="item-page-modal-item-title">{itemName}</p>
            {hasVariantsEnabled && currentOption && currentOption.metadata && (
              <p className="item-page-modal-item-option">
                {currentOption.metadata.type.toLocaleUpperCase()[0]}
                {currentOption.metadata.type.toLocaleLowerCase().slice(1)}: {currentOption.metadata.value}
              </p>
            )}
            <p className="item-page-modal-item-quantity">Quantity: {currentQuantity}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default connect(null, { addToCart })(ItemPage);
