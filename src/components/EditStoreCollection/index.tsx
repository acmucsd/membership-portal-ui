import React, {useState} from 'react';

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
  const [descriptionValue, setDescriptionValue] = useState<string>(description);
  
  const onBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            onBlur={(e) => {
              if(e.target.value !== '') {
                handleChange(JSON.stringify(
                  {
                    uuid: props.uuid,
                    data: {
                      title: e.target.value
                    }
                  }
                ));
              }
            }}
          />
          <div className="archive-icon">
            <Icon component={ArchiveIcon}/>
          </div>
        </div>
        <textarea 
          rows={4}  
          value={descriptionValue}
          onChange={(e) => {
            setDescriptionValue(e.target.value);
            if(e.target.value !== '') {
              handleChange(JSON.stringify(
                {
                  uuid: props.uuid,
                  data: {
                    description: e.target.value
                  }
                }
              ));
            }
          }}/>
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
