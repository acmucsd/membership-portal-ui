import React, { useState } from 'react';
import { connect } from 'react-redux';

import EventCheckIn from '../components/EventCheckIn';
import { checkIn } from '../actions/eventsActions';

const EventCheckInContainer = props => {
  const [value, setValue] = useState('');
  const [asStaff, setAsStaff] = useState(false);
  const handleChange = event => {
    setValue(event.target.value);
  ***REMOVED***
  const handleAsStaffChange = event => {
    setAsStaff(event.target.checked);
  ***REMOVED***

  const handleSubmit = () => {
    props.checkIn({ attendanceCode: value, asStaff: asStaff });
  ***REMOVED***

  const handleEnter = event => {
    if (event.key === 'Enter') {
      props.checkIn({ attendanceCode: value, asStaff: asStaff });
    }
  ***REMOVED***

  return (
    <EventCheckIn
      onChange={handleChange}
      onAsStaffChange={handleAsStaffChange}
      onSubmit={handleSubmit}
      onKeyPress={handleEnter}
      value={value}
      user={props.user}
    />
  );
***REMOVED***
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  { checkIn }
)(EventCheckInContainer);
