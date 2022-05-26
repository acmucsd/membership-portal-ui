import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import EventButton from '../../../event/components/EventButton';
import background from '../../../assets/graphics/background.svg';

import { formatDate, formatTime } from '../../../utils';
import { EventSelectParams } from '../../../types';
import { useAppDispatch } from '../../../redux/store';
import { addAttendance } from '../../adminSlice';

import { eventSelector, fetchCurrentEvents } from '../../../event/eventSlice';

import './style.less';
import QRScanner from '../QRScanner';

import SuccessIcon from '../../../assets/icons/checkin-success.svg';
import FailedIcon from '../../../assets/icons/checkin-failure.svg';

const EventSelectPage: React.FC = () => {
  const { eventId } = useParams<EventSelectParams>();
  const [email, setEmail] = useState<String>('');
  const [success, setSuccess] = useState<Boolean>(false);
  const [isCheckedIn, setCheckedIn] = useState<Boolean>(false);

  const { currentEvents: events } = useSelector(eventSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentEvents());
  }, [dispatch]);

  const handleAddAttendance = () => {
    const attendanceDetails = {
      attendees: [email],
      event: eventId,
      asStaff: false,
    };
    dispatch(addAttendance(attendanceDetails))
      .unwrap()
      .then((res) => {
        if (!res.attendances.length) setCheckedIn(true);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setEmail('');
        }, 3000);
      })
      .catch();
  };

  useEffect(() => {
    if (eventId && email !== '') handleAddAttendance();
  }, [email]);

  return (
    <div className="event-select-page">
      <h1 className="title">Admin</h1>
      <h2 className="subtitle">Check In Member</h2>
      {eventId && <QRScanner onSuccess={(result) => setEmail(result)} />}
      <div className={!success ? 'hidden' : 'message-wrapper'}>
        <img src={success && !isCheckedIn ? SuccessIcon : FailedIcon} alt={success && !isCheckedIn ? 'Success Icon' : 'Failed Icon'} />
        <h3 className={isCheckedIn ? 'error-msg' : 'success-msg'}>
          <span>{email}</span>
          <br />
          {isCheckedIn ? 'was already checked in' : 'is checked in!'}
        </h3>
      </div>
      <div className={`${eventId ? 'hidden' : ''} event-select-page__grid`}>
        {events.map((event) => {
          const startDate = formatDate(event.start);
          const startTime = formatTime(event.start);
          const endDate = formatDate(event.end);
          const endTime = formatTime(event.end);
          const date = startDate === endDate ? `${startDate}, ${startTime} - ${endTime}` : `${startDate}, ${startTime} - ${endDate}, ${endTime}`;
          return (
            <EventButton
              key={`upcoming-${event.uuid}`}
              uuid={event.uuid}
              cover={event.cover || background}
              date={date}
              description={event.description}
              committee={event.committee}
              location={event.location}
              eventLink={event.eventLink}
              title={event.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EventSelectPage;
