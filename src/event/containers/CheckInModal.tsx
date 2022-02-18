import React from 'react';
import { connect } from 'react-redux';

import ModalComponent from '../components/Modal';
import { checkOut } from '../eventActions';

interface CheckInModalContainerProps {
  currentEvent: {
    cover: string;
    title: string;
    pointValue: number;
  };
  visible: boolean;
}

const CheckInModalContainer: React.FC<CheckInModalContainerProps> = (props) => {
  const { currentEvent, visible } = props;

  const checkInMessage = `Checked in to ${currentEvent.title}!`;

  const fullMessage = `Thanks for checking in! You earned ${currentEvent.pointValue} points.`;

  const hideMessage = () => {
    checkOut();
  };

  return (
    <ModalComponent
      title={<div style={{ marginRight: 32 }}>{checkInMessage}</div>} // Prevents title and close button from overlapping
      image={currentEvent.cover}
      visible={visible}
      handleOk={hideMessage}
      handleCancel={hideMessage}
      content={fullMessage}
    />
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  currentEvent: state.event.currentEvent,
  visible: state.event.checkin,
});

export default connect(mapStateToProps)(CheckInModalContainer);
