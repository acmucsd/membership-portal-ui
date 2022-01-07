import React from 'react';
import { Link } from 'react-router-dom';

import { PublicMerchItem } from '../../../types';
import { processItem, processItemPrice } from '../../../utils';

import StorePlus from '../../../assets/icons/store-plus-icon.svg';
import EditableIcon from '../../../assets/icons/editable-icon.svg';

import './style.less';

interface ItemCardProps {
  item?: PublicMerchItem;
  editable?: boolean;
  editableLink?: string;
  placeholder?: boolean;
  placeholderLink?: string;
}

const ItemCard: React.FC<ItemCardProps> = (props) => {
  const { item, editable, editableLink = '', placeholder, placeholderLink = '' } = props;

  if (placeholder) {
    return (
      <div className="item-card">
        <Link to={placeholderLink}>
          <div className="item-card-placeholder">
            <img className="item-card-placeholder-plus-sign" src={StorePlus} alt="Plus" />
          </div>
        </Link>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  const { uuid, itemName, description, picture, hidden } = item;

  const { outOfStock } = processItem(item.options);

  return (
    <div className={`item-card${hidden ? ' hidden' : ''}`}>
      {editable && (
        <Link to={editableLink}>
          <img className="item-card-editable-icon" src={EditableIcon} alt="Editable" />
        </Link>
      )}
      <Link to={`/store/item/${uuid}`}>
        <div className={`item-card-contents${outOfStock ? ' out-of-stock' : ''}`}>
          <div className="item-card-image-container">
            <img className="item-card-image" src={picture} alt={description} />
          </div>
          <div className="item-card-name">
            {itemName}
            {hidden ? ' - Hidden' : ''}
          </div>
          {processItemPrice(item.options)}
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
