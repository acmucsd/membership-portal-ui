import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkIn } from '../eventActions';

interface CheckInHandlerProps {
  checkIn: Function;
}

const CheckInHandler: React.FC<CheckInHandlerProps> = (props) => {
  const { checkIn: reduxCheckIn } = props;

  const { code } = useParams<{ code: string }>();

  reduxCheckIn({ attendanceCode: decodeURIComponent(code || ''), asStaff: false });

  return <Redirect to="/" />;
};

export default connect(null, { checkIn })(CheckInHandler);
