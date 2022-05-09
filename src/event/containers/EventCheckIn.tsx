import React, { ChangeEventHandler, FormEventHandler, KeyboardEventHandler, useState } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useSelector } from 'react-redux';
import { authSelector } from '../../auth/authSlice';
import { useAppDispatch } from '../../redux/store';
import EventCheckIn from '../components/EventCheckIn';
import { checkIn } from '../eventSlice';

const EventCheckInContainer: React.FC = () => {
  const user = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');
  const [asStaff, setAsStaff] = useState(false);
  const handleChange: ChangeEventHandler = (event) => {
    setValue((event.target as any).value);
  };
  const handleAsStaffChange = (event: CheckboxChangeEvent) => {
    setAsStaff(event.target.checked);
  };

  const handleSubmit: FormEventHandler = () => dispatch(checkIn({ attendanceCode: value, asStaff }));
  const handleEnter: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') {
      dispatch(checkIn({ attendanceCode: value, asStaff }));
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
