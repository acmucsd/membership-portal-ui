import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { AppContext } from '../../context';
import { checkIn, fetchAttendance } from '../utils';

const CheckInHandler: React.FC = () => {
  const { setCheckinEvent, setAttendance } = useContext(AppContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  checkIn({ attendanceCode: decodeURIComponent(params.get('code') || ''), asStaff: false }).then((event) => {
    setCheckinEvent(event);
    fetchAttendance().then(setAttendance);
  });

  return <Redirect to="/" />;
};

export default CheckInHandler;
