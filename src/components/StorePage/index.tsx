import React, { useState } from 'react';

import { Button } from 'antd';

import StoreCollectionsContainer from '../../containers/StoreCollections';
import EditStoreCollection from '../../containers/admin/EditStoreCollection';

import './style.less';
import { Console } from 'console';

interface StorePageProps {
  isAdmin: boolean;
  handleClick: (any) => void;
}

const StorePage: React.FC<StorePageProps> = (props) => {
  const { isAdmin } = props;
  const [inEditMode, toggleEdit] = useState(false);
  const [changesMade, setChangesMade] = useState<any[]>([]); // editing headers for now

  const manageEdit = () => {
    // If in edit mode, send api call to save changes
    if (inEditMode) {
      changesMade.forEach((elem) => {
        props.handleClick(elem);
      });
    }
    setChangesMade([]);

    // TODO: manage changes for creating and editing item details
    toggleEdit(!inEditMode);
  };

  const handleChangeFunc = (incomingData) => {
    const incomingDataObj = JSON.parse(incomingData);
    const oldData: any[] = changesMade;
    let newData: any[] = [];
    let isUpdate = false;

    oldData.forEach((item) => {
      let newItem = {
        uuid: item.uuid,
        data: {},
      };
      // make sure there is one change per uuid
      if (item.uuid === incomingDataObj.uuid) {
        // update an existing pending change
        newItem.data = { ...item.data, ...incomingDataObj.data };
        isUpdate = true;
      } else {
        // add a change for a new uuid
        newItem.data = incomingDataObj.data;
      }
      newData.push(newItem);
    });
    
    if (!isUpdate) {
      newData.push(JSON.parse(incomingData));
    }
    setChangesMade(newData);
  };

  return (
    <div className="store-page">
      <h1>Diamond Outfitters</h1>
      {isAdmin ? (
        <Button onClick={manageEdit}> {inEditMode ? 'Save Changes' : 'Edit Store'} </Button>
      ) : null}
      {isAdmin && inEditMode ? (
        <EditStoreCollection handleChange={handleChangeFunc} />
      ) : (
        <StoreCollectionsContainer />
      )}
    </div>
  );
};

export default StorePage;
