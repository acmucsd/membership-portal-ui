import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkIn } from '../eventActions';

interface CheckInHandlerProps {
  query: { code: string | null };
  checkIn: Function;
}

const CheckInHandler: React.FC<CheckInHandlerProps> = (props) => {
  const { checkIn: reduxCheckIn } = props;

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  reduxCheckIn({ attendanceCode: decodeURIComponent(params.get('code') || ''), asStaff: false });

  return <Redirect to="/" />;
};

export default connect(null, { checkIn })(CheckInHandler);
