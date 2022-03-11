import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { checkIn } from '../eventSlice';

const CheckInHandler: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  dispatch(checkIn({ attendanceCode: decodeURIComponent(params.get('code') || ''), asStaff: false }));

  return <Redirect to="/" />;
};

export default CheckInHandler;
