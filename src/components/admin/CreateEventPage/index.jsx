import React from 'react';
import CreateEventForm from '../../../containers/admin/CreateEventForm';

import './style.less';

const CreateEventPage = () => {
  return (
    <div className="create-event-page">
      <h1 className="title">Admin</h1>
      <CreateEventForm />
    </div>
  );
};

export default CreateEventPage;
