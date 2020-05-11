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
  event: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    pointValue: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditEventPage;
