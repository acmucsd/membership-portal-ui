import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import ModalComponent from '../components/Modal';
import { checkOutEvent, eventSelector } from '../eventSlice';

const CheckInModalContainer: React.FC = () => {
  const { currentEvent, checkin: visible } = useSelector(eventSelector);
  const dispatch = useAppDispatch();

  const checkInMessage = `Checked in to ${currentEvent.title}!`;
  const fullMessage = `Thanks for checking in! You earned ${currentEvent.pointValue} points.`;
  const hideMessage = () => dispatch(checkOutEvent());

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

export default CheckInModalContainer;
