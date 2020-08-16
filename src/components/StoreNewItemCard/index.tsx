import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import './style.less';

const NewItemCard: React.FC = () => {
  return (
    <div className="item-card new-item-card">
      <p>Add Item</p>
      <PlusOutlined />
    </div>
  );
};

export default NewItemCard;
