import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkIn } from '../eventActions';

interface CheckInHandlerProps {
  query: { code: string | null };
  checkIn: Function;
}

const CheckInHandler: React.FC<CheckInHandlerProps> = (props) => {
  const { query, checkIn: reduxCheckIn } = props;

  reduxCheckIn({ attendanceCode: query.code, asStaff: false });

  return <Redirect to="/" />;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  query: state.router.location.query,
});

export default connect(mapStateToProps, { checkIn })(CheckInHandler);
