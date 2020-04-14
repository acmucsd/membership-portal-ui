import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CreateEventPage from '../../components/admin/CreateEventPage';
import PageLayout from '../PageLayout';

const CreateEventPageContainer = props => {
  return (
    <PageLayout>
      <CreateEventPage />
    </PageLayout>
  );
***REMOVED***

export default connect(
  null,
  {}
)(CreateEventPageContainer);
