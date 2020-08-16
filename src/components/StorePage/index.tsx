import React, { useState, useEffect } from 'react';

import StoreCollectionsContainer from '../../containers/StoreCollections';
import EditStoreCollection from '../../containers/admin/EditStoreCollection';

import { Button } from 'antd';

import './style.less';

interface StorePageProps {
  isAdmin: boolean;
  handleClick: (any) => void;
}

const StorePage: React.FC<StorePageProps> = (props) => {
  
  const { isAdmin } = props;
  const [ inEditMode, toggleEdit ] = useState(false);
  const [ changesMade, setChangesMade ] = useState<any[]>([]); // editing headers for now
  const [ numChangesMade, incrementChangesMade ] = useState(0);

  let manageEdit = () => {
    // If in edit mode, send api call to save changes
    if(inEditMode) {
      changesMade.forEach((elem) => {props.handleClick(elem)})
    }
    setChangesMade([]);

    // TODO: manage changes for creating and editing item details
    toggleEdit(!inEditMode);
  }

  let handleChangeFunc = (newData) => {    
    incrementChangesMade(numChangesMade + 1); // debug to see how many times handle change is called. TODO delete
    let oldData:any[] = changesMade;
    oldData.push(JSON.parse(newData));
    setChangesMade(oldData);
  }

  return (
    <div className="store-page">
      <h1>Diamond Outfitters</h1>
      { changesMade ? <div>{JSON.stringify(changesMade)} and {numChangesMade}</div> : null}
      { isAdmin ? <Button onClick={ manageEdit }> { inEditMode ? 'Save Changes' : 'Edit Store' } </Button> : null }
      { (isAdmin && inEditMode) ? <EditStoreCollection handleChange={handleChangeFunc}/> : <StoreCollectionsContainer /> }
    </div>
  );
};

export default StorePage;
