import React, { useState, ChangeEventHandler, KeyboardEventHandler, FormEventHandler } from 'react';
import { connect } from 'react-redux';

import CheckInSuccess from '../components/CheckInSuccess';
import CheckInError from '../components/CheckInError';

import { checkIn, checkOut } from '../actions/eventsActions';

const CheckInHandler = (props) => {
  const { currentEvent, error, success } = props;

  const [value, setValue] = useState('');

  if (success) {
    return <CheckInSuccess event={currentEvent} checkOut={props.checkOut} />;
  }

  const handleChange: ChangeEventHandler = (event) => {
    setValue((event.target as any).value);
  };

  const handleSubmit: FormEventHandler = () => {
    props.checkIn({ attendanceCode: value, asStaff: false });
  };

  const handleEnter: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') {
      props.checkIn({ attendanceCode: value, asStaff: false });
    }
  };

  return (
    <CheckInError
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onKeyPress={handleEnter}
      value={value}
    />
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  currentEvent: state.events.currentEvent,
  error: state.events.error,
  success: state.events.checkin,
});

export default connect(mapStateToProps, { checkIn, checkOut })(CheckInHandler);
