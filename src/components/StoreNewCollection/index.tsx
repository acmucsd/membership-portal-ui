import React, { useState } from 'react';

import { Input } from 'antd';
import Icon, { EditFilled } from '@ant-design/icons';
import { ReactComponent as ArchiveIcon } from '../../assets/icons/archive.svg';

import NewItemCard from '../StoreNewItemCard';

import './style.less';

/* Once we do admin item page implementation, NewCollection will be functional */

const StoreNewCollection: React.FC = () => {
  const [descriptionValue, setDescriptionValue] = useState<string>('New collection description');

  return (
    <div className="collection">
      <div className="collection-info">
        <div className="edit-header">
          <Input
            suffix={<EditFilled />}
            defaultValue="New Collection"
            onBlur={(e) => {
              if (e.target.value !== '') {
                // to be specified once item creation is completed
              }
            }}
          />
          <div className="archive-icon">
            <Icon component={ArchiveIcon} />
          </div>
        </div>
        <textarea
          rows={4}
          value={descriptionValue}
          onChange={(e) => {
            setDescriptionValue(e.target.value);
            // to be specified once item creation is completed
          }}
        />
      </div>
      <div className="collection-items">
        <NewItemCard />
      </div>
    </div>
  );
};

export default StoreNewCollection;
