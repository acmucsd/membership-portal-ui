import React from 'react';
import PropTypes from 'prop-types';
import EditEventForm from '../../containers/admin/EditEventForm';

import './style.less';

const EditEventPage = (props) => {
  const { event } = props;

  return (
    <div className="edit-event-page">
      <h1 className="title">Admin</h1>
      <EditEventForm event={event} />
    </div>
  );
};

EditEventPage.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EditEventPage;
