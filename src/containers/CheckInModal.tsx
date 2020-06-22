import React from 'react';
import { connect } from 'react-redux';

import ModalComponent from '../components/Modal';
import { checkOut } from '../actions/eventsActions';

interface CheckInModalContainerProps {
  currentEvent: {
    cover: string,
    title: string,
  },
  visible: boolean,
  checkOut: Function
};

const CheckInModalContainer: React.FC<CheckInModalContainerProps> = (props) => {
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

const mapStateToProps = (state: {[key: string]: any}) => ({
  currentEvent: state.events.currentEvent,
  visible: state.events.checkin,
});

export default connect(mapStateToProps, { checkOut })(CheckInModalContainer);
