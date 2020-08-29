import React, { useState } from 'react';

import { Input } from 'antd';
import Icon, { EditFilled } from '@ant-design/icons';
import { ReactComponent as ArchiveIcon } from '../../assets/icons/archive.svg';

import ItemCard from '../StoreItemCard';
import NewItemCard from '../StoreNewItemCard';

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
  const [toArchive, setToArchive] = useState<boolean>(false);

  return (
    <div className="collection">
      <div className="collection-info">
        <div className="edit-header">
          <div style={{ marginBottom: 16 }}>
            <Input
              addonAfter={<EditFilled />}
              defaultValue={title}
              onBlur={(e) => {
                if (e.target.value !== '') {
                  handleChange(
                    JSON.stringify({
                      uuid: props.uuid,
                      data: {
                        title: e.target.value,
                      },
                    }),
                  );
                }
              }}
            />
          </div>
          <div
            className="archive-icon"
            style={toArchive ? { borderColor: '#EF626C' } : { borderColor: '#000' }}
          >
            <Icon
              component={ArchiveIcon}
              onClick={() => {
                setToArchive(!toArchive);
              }}
            />
          </div>
        </div>
        <textarea
          rows={4}
          value={descriptionValue}
          onChange={(e) => {
            setDescriptionValue(e.target.value);
            if (e.target.value !== '') {
              handleChange(
                JSON.stringify({
                  uuid: props.uuid,
                  data: {
                    description: e.target.value,
                  },
                }),
              );
            }
          }}
        />
      </div>
      <div className="collection-items">
        {merchandise.map((item) => (
          <ItemCard key={item.itemName} />
        ))}
        <NewItemCard />
      </div>
    </div>
  );
};

export default EditStoreCollection;
