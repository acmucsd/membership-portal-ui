import React, { ChangeEventHandler, FormEventHandler, KeyboardEventHandler, useContext, useState } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useSelector } from 'react-redux';
import { authSelector } from '../../auth/authSlice';
import EventCheckIn from '../components/EventCheckIn';
import { checkIn, fetchAttendance } from '../utils';
import { AppContext } from '../../context';

const EventCheckInContainer: React.FC = () => {
  const user = useSelector(authSelector);
  const { setAttendance, setCheckinEvent } = useContext(AppContext);

  const [value, setValue] = useState('');
  const [asStaff, setAsStaff] = useState(false);
  const handleChange: ChangeEventHandler = (event) => {
    setValue((event.target as any).value);
  };
  const handleAsStaffChange = (event: CheckboxChangeEvent) => {
    setAsStaff(event.target.checked);
  };

  const executeCheckin = () => {
    checkIn({ attendanceCode: value, asStaff }).then((event) => {
      setCheckinEvent(event);
      fetchAttendance().then(setAttendance);
    });
  };

  const handleSubmit: FormEventHandler = () => executeCheckin();
  const handleEnter: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') {
      executeCheckin();
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

export default EventCheckInContainer;
