import React, { useState, ChangeEventHandler, FormEventHandler, KeyboardEventHandler } from 'react';
import { connect } from 'react-redux';

import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import EventCheckIn from '../components/EventCheckIn';
import { checkIn } from '../actions/eventsActions';

interface EventCheckInContainerProps {
  user: {
    profile: {
      accountType: string;
    };
  };
  checkIn: Function;
}

const EventCheckInContainer: React.FC<EventCheckInContainerProps> = (props) => {
  const { user } = props;

  const [value, setValue] = useState('');
  const [asStaff, setAsStaff] = useState(false);
  const handleChange: ChangeEventHandler = (event) => {
    setValue((event.target as any).value);
  };
  const handleAsStaffChange = (event: CheckboxChangeEvent) => {
    setAsStaff(event.target.checked);
  };

  const handleSubmit: FormEventHandler = () => {
    props.checkIn({ attendanceCode: value, asStaff });
  };

  const handleEnter: KeyboardEventHandler = (event) => {
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

const mapStateToProps = (state: { [key: string]: any }) => ({
  user: state.user,
});

export default connect(mapStateToProps, { checkIn })(EventCheckInContainer);
