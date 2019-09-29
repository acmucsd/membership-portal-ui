import React from 'react';
import { connect } from 'react-redux';

import ModalComponent from '../components/Modal';
import { checkOut } from '../actions/eventsActions';

const CheckInModalContainer = props => {
  const checkInMessage="Checked in!";
  // TODO: Add event name and points to this message.
  const fullMessage="Please show this to a board member to enter the room!"

  const hideMessage = () => {
    props.checkOut();
  }

  return (
    <ModalComponent
      title={checkInMessage}
      visible={props.visible}
      handleOk={hideMessage}
      handleCancel={hideMessage}
      content={fullMessage}
    />
  );
***REMOVED***

const mapStateToProps = state => ({
  visible: state.events.checkin,
});

export default connect(
  mapStateToProps,
  { checkOut }
)(CheckInModalContainer);
