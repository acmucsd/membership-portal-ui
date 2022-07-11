import React, { useContext } from 'react';
import { AppContext } from '../../context';
import ModalComponent from '../components/Modal';

const CheckInModalContainer: React.FC = () => {
  const { checkinEvent, setCheckinEvent } = useContext(AppContext);

  const checkInMessage = `Checked in to ${checkinEvent?.title}!`;
  const fullMessage = `Thanks for checking in! You earned ${checkinEvent?.pointValue} points.`;
  const hideMessage = () => setCheckinEvent(undefined);

  return (
    <ModalComponent
      title={<div style={{ marginRight: 32 }}>{checkInMessage}</div>} // Prevents title and close button from overlapping
      image={checkinEvent?.cover}
      visible={!!checkinEvent}
      handleOk={hideMessage}
      handleCancel={hideMessage}
      content={fullMessage}
    />
  );
};

export default CheckInModalContainer;
