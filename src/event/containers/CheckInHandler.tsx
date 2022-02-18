import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { checkIn } from '../eventActions';

const CheckInHandler: React.FC = () => {
  const { code } = useParams<{ code: string }>();

  checkIn({ attendanceCode: decodeURIComponent(code || ''), asStaff: false });

  return <Redirect to="/" />;
};

export default CheckInHandler;
