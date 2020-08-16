import React from 'react';

import ItemCard from '../StoreItemCard';
import NewItemCard from '../StoreNewItemCard';
import { Input } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { ReactComponent as ArchiveIcon } from'../../assets/icons/archive.svg';
import Icon from '@ant-design/icons';

import './style.less';

interface EditStoreCollectionProps {
  auth: {
      admin: boolean;
  };
  uuid: string;
  description: string;
  title: string;
  merchandise: [
    {
      collection: string;
      description: string;
      discountPercentage: number;
      itemName: string;
      lifetimeLimit: number;
      monthlyLimit: number;
      picture: string;
      price: number;
      uuid: string;
    },
  ];
  handleChange: (string) => void;
}

const EditStoreCollection: React.FC<EditStoreCollectionProps> = (props) => {
  const { description, title, merchandise, handleChange } = props;
  
  const onBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target); // TODO delete
    if(title !== e.target.value && e.target.value !== '') {
      handleChange(JSON.stringify(
        {
          uuid: props.uuid,
          data: {
            title: e.target.value
          }
        }
      ));
    }
  }

  return ( 
    <div className="collection">
      <div className="collection-info">
        <div className="edit-header">
          <Input 
            suffix={<EditFilled />} 
            defaultValue={title}
            onBlur={onBlurChange}
          />
          <div className="archive-icon">
            <Icon component={ArchiveIcon}/>
          </div>
        </div>
        <p>{description}</p>
      </div>
      <div className="collection-items">
        { merchandise.map((item, i) => (
          <ItemCard key={i}/>
        )) }
        <NewItemCard/>
      </div>
    </div>
  );
};

export default EditStoreCollection;
