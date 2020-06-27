import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.less';

const ItemMiniDisplay = props => {
  return(
    <div className="Item-Mini-Display">
      <div className="image-display-wrapper">
        <img className="image-display" src={props.image}/>
      </div>
      <div className='item-meta-wrapper'>
        <div className='item-name'>{props.name}</div>
        <div className='item-meta-1'>Type: Whole Wheat</div>
        <div className='item-meta-2'>Size: LARGE</div>
        <a className='edit-action action' onClick={() => {
          props.edit();
        }}>Edit</a>
        <a className='delete-action action' onClick={() => {
          props.delete();
        }}>Remove</a>
      </div>
      
    </div>
  )
}
ItemMiniDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
export default ItemMiniDisplay