import React from 'react';
import { connect } from 'react-redux';
import PageLayout from './PageLayout';
import StorePage from '../components/StorePage';

import { editCollection } from '../actions/adminActions';

interface StorePageContainerProps {
  isAdmin: boolean;
  handleClick: (any) => any;
}

const StorePageContainer: React.FC<StorePageContainerProps> = (props) => {
  const { isAdmin } = props;
  let submitChanges = (newChange) => {
    editCollection(newChange);
  }
  return (
    <PageLayout>
      <StorePage isAdmin={isAdmin} handleClick={submitChanges}/>
    </PageLayout>
  );
};


const mapStateToProps = (state: { [key: string]: any }) => ({
  isAdmin: state.auth.admin,
  user: state.user,
});

export default connect(mapStateToProps)(StorePageContainer);
