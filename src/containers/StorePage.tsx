import React from 'react';
import { connect } from 'react-redux';
import PageLayout from './PageLayout';
import StorePage from '../components/StorePage';

import { editCollection } from '../actions/adminActions';
import { fetchCollections } from '../actions/storeActions';
import { ThunkActionCreator } from '../actions/types';

interface StorePageContainerProps {
  isAdmin: boolean;
  handleClick: (any) => any;
}

const StorePageContainer: React.FC<StorePageContainerProps> = (props) => {
  const { isAdmin, handleClick } = props;
  
  return (
    <PageLayout>
      <StorePage isAdmin={isAdmin} handleClick={handleClick}/>
    </PageLayout>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  isAdmin: state.auth.admin,
  user: state.user,
});

const mapDispatchToProps = (dispatch: ThunkActionCreator) => ({
  handleClick: (newChange) => {
    dispatch(editCollection(newChange));
    dispatch(fetchCollections);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StorePageContainer);
