import React from 'react';
import './style.less';

export interface ItemMiniDisplayPropTypes {
  name: string;
  image: string;
  edit: Function;
  remove: Function;
}

const ItemMiniDisplay = ({ name, image, edit, remove }: ItemMiniDisplayPropTypes) => {
  return (
    <div className="Item-Mini-Display">
      <div className="image-display-wrapper">
        <img className="image-display" src={image} alt={name} />
      </div>
      <div className="item-meta-wrapper">
        <div className="item-name">{name}</div>
        <div className="item-meta-1">Type: Whole Wheat</div>
        <div className="item-meta-2">Size: LARGE</div>
        <div
          className="edit-action action"
          onClick={() => {
            edit();
          }}
        >
          Edit
        </div>
        <div
          className="delete-action action"
          onClick={() => {
            remove();
          }}
        >
          Remove
        </div>
      </div>
    </div>
  );
};

export default ItemMiniDisplay;
