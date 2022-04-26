import React from 'react';
import EditEventForm from '../../containers/EditEventForm';

import './style.less';

interface EventProp {
  uuid: string;
  cover: string;
  description: string;
  location: string;
  pointValue: string;
  title: string;
}

interface EditEventPageProps {
  event: EventProp;
}

const EditEventPage: React.FC<EditEventPageProps> = (props) => {
  const { event } = props;

  const EditEventCustomForm = (EditEventForm as unknown) as React.ComponentClass<any>;

  return (
    <div className="edit-event-page">
      <h1 className="title">Admin</h1>
      <EditEventCustomForm event={event} />
    </div>
  );
};

export default EditEventPage;
