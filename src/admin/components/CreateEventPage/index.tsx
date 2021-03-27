import React from 'react';
import CreateEventForm from '../../containers/CreateEventForm';

import './style.less';

const CreateEventPage: React.FC = () => {
  return (
    <div className="create-event-page">
      <h1 className="title">Admin</h1>
      <CreateEventForm />
    </div>
  );
};

export default CreateEventPage;
