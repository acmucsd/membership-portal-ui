import React from 'react';
import { PublicEvent } from '../../../api';
import EditEventForm from '../../containers/EditEventForm';

import './style.less';

interface EditEventPageProps {
  event: PublicEvent;
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
