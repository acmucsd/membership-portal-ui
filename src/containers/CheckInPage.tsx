import React from 'react';
import { connect } from 'react-redux';

import LoginLayout from '../components/LoginLayout';
import CheckInHandler from './CheckInHandler';

import { checkIn } from '../actions/eventsActions';

interface CheckInPageProps {
  query: { code: string | null };
  checkIn: Function;
}

const CheckInPage: React.FC<CheckInPageProps> = (props) => {
  const { query, checkIn: inCheckIn } = props;

  inCheckIn({ attendanceCode: query.code, asStaff: false });

  return (
    <LoginLayout>
      <CheckInHandler />
    </LoginLayout>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  query: state.router.location.query,
});

export default connect(mapStateToProps, { checkIn })(CheckInPage);
