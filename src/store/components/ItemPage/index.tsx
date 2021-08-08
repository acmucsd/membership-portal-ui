import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Select } from 'antd';

import { MerchandiseItemModel } from '../../../types';

import OptionSelector from '../OptionSelector';

import './style.less';

const { Option } = Select;

interface ItemPageProps {
  item: MerchandiseItemModel | undefined;
}

const ItemPage: React.FC<ItemPageProps> = (props) => {
  const { item } = props;
  const history = useHistory();

  const [itemPrice, setItemPrice] = useState<number>();

  if (!item) {
    return null;
  }

  const { itemName, description, hidden, options, picture } = item;

  if (hidden) {
    history.push('/store');
  }

  return (
    <div className="item-page">
      <img className="item-image" src={picture} alt={description} />
      <div className="item-contents">
        <h2>{itemName}</h2>
        <p>{itemPrice}</p>
        <p>{description}</p>
        <Select>
          <Option key="1">1</Option>
          <Option key="2">2</Option>
          <Option key="3">3</Option>
          <Option key="4">4</Option>
          <Option key="5">5</Option>
        </Select>
        <OptionSelector
          options={[
            { key: 'S', value: 'Small' },
            { key: 'M', value: 'Medium' },
            { key: 'L', value: 'Large' },
          ]}
          optionSelected={(option) => {
            console.log('You selected:', option);
          }}
        />
      </div>
    </div>
  );
};

export default ItemPage;
