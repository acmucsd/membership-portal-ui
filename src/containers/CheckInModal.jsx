import React from 'react';
import { connect } from 'react-redux';

import ModalComponent from '../components/Modal';
import { checkOut } from '../actions/eventsActions';

const CheckInModalContainer = props => {
  const checkInMessage = `Checked in to ${props.currentEvent.title}!`;
  // TODO: Add event name and points to this message.
  const fullMessage = 'Please show this to a board member to enter the room!';

  const hideMessage = () => {
    props.checkOut();
  };

  return (
    <ModalComponent
      title={checkInMessage}
      image={props.currentEvent.cover}
      visible={props.visible}
      handleOk={hideMessage}
      handleCancel={hideMessage}
      content={fullMessage}
    />
  );
};

const mapStateToProps = state => ({
  currentEvent: state.events.currentEvent,
  visible: state.events.checkin,
});

export default connect(mapStateToProps, { checkOut })(CheckInModalContainer);
