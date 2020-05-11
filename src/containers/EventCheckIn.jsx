import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EventCheckIn from '../components/EventCheckIn';
import { checkIn } from '../actions/eventsActions';

const EventCheckInContainer = (props) => {
  const { user } = props;

  const [value, setValue] = useState('');
  const [asStaff, setAsStaff] = useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleAsStaffChange = (event) => {
    setAsStaff(event.target.checked);
  };

  const handleSubmit = () => {
    props.checkIn({ attendanceCode: value, asStaff });
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      props.checkIn({ attendanceCode: value, asStaff });
    }
  };

  return (
    <EventCheckIn
      onChange={handleChange}
      onAsStaffChange={handleAsStaffChange}
      onSubmit={handleSubmit}
      onKeyPress={handleEnter}
      value={value}
      user={user}
    />
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

EventCheckInContainer.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.shape({
      accountType: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, { checkIn })(EventCheckInContainer);
