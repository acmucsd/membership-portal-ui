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
            <img src={StorePlus} alt="Plus" />
          </div>
        </Link>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  item.picture =
    'https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7CA1SnyDGm7%2BL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UX679_.png';

  const { uuid, itemName, description, picture } = item;

  const { outOfStock } = processItem(item.options);

  return (
    <div className="item-card">
      <Link to={`/store/item/${uuid}`}>
        <div className={`item-card-contents${outOfStock ? ' out-of-stock' : ''}`}>
          {editable && (
            <Link to={editableLink}>
              <img className="item-card-editable-icon" src={EditableIcon} alt="Editable" />
            </Link>
          )}
          <div className="item-card-image-container">
            <img className="item-card-image" src={picture} alt={description} />
          </div>
          <div className="item-card-name">{itemName}</div>
          {processItemPrice(item.options)}
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
