import React from 'react';
import EditEventForm from '../../containers/EditEventForm';

import './style.less';

 const EditEventPage = () => {
  return (
    <div className="edit-event-page">
      <h1 className="title">Admin</h1>
      <EditEventForm />
    </div>
  );
};

 export default EditEventPage;
