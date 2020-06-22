import React from 'react';
import EditEventForm from '../../containers/admin/EditEventForm';

import './style.less';

interface EventProp {
  uuid: string,
  cover: string,
  description: string,
  location: string,
  pointValue: string,
  title: string
}

interface EditEventPageProps {
  event: EventProp
}

const EditEventPage: React.FC<EditEventPageProps> = (props) => {
  const { event } = props;

  return (
    <div className="edit-event-page">
      <h1 className="title">Admin</h1>
      <EditEventForm event={event as any} />
    </div>
  );
};

export default EditEventPage;
