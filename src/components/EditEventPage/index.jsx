import React from 'react';
import EditEventForm from '../../containers/admin/EditEventForm';

import './style.less';

const EditEventPage = (props) => {
  return (
    <div className="edit-event-page">
      <h1 className="title">Admin</h1>
      <EditEventForm event={props.event} />
    </div>
  );
};

export default EditEventPage;
