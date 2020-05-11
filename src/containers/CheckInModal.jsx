import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ModalComponent from '../components/Modal';
import { checkOut } from '../actions/eventsActions';

const CheckInModalContainer = (props) => {
  const { currentEvent, visible } = props;

  const checkInMessage = `Checked in to ${currentEvent.title}!`;
  // TODO: Add event name and points to this message.
  const fullMessage = 'Please show this to a board member to enter the room!';

  const hideMessage = () => {
    props.checkOut();
  };

  return (
    <ModalComponent
      title={checkInMessage}
      image={currentEvent.cover}
      visible={visible}
      handleOk={hideMessage}
      handleCancel={hideMessage}
      content={fullMessage}
    />
  );
};

const mapStateToProps = (state) => ({
  currentEvent: state.events.currentEvent,
  visible: state.events.checkin,
});

CheckInModalContainer.propTypes = {
  currentEvent: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { checkOut })(CheckInModalContainer);
