import React, { useState } from 'react';
import { connect } from 'react-redux';

import EventCheckIn from '../components/EventCheckIn';
import { checkIn } from '../actions/eventsActions';

const EventCheckInContainer = props => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = () => {
    props.checkIn(value)
  }

  return (
    <EventCheckIn
      onChange={handleChange}
      onSubmit={handleSubmit}
      value={value}
    />
  )
***REMOVED***

export default connect(
  null,
  { checkIn }
)(EventCheckInContainer);
