import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import background from '../../assets/graphics/background.svg';
import { authSelector } from '../../auth/authSlice';
import { useAppDispatch } from '../../redux/store';
import { UserAccessType } from '../../types';
import { formatDate, formatTime } from '../../utils';
import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import { eventSelector, fetchAttendance, fetchFutureEvents } from '../eventSlice';

const UpcomingEventsContainer: React.FC = () => {
  const { futureEvents: events, attendance } = useSelector(eventSelector);
  const {
    profile: { accessType },
  } = useSelector(authSelector);
  const dispatch = useAppDispatch();
  const canEditEvents = [UserAccessType.MARKETING, UserAccessType.ADMIN].includes(accessType);

  useEffect(() => {
    dispatch(fetchFutureEvents());
    dispatch(fetchAttendance());
  }, [dispatch]);

  return (
    <div>
      <h1 className="subtitle">Upcoming Events</h1>
      <EventsList>
        {events.map((event) => {
          const startTime = formatTime(event.start);
          const endTime = formatTime(event.end);
          const date = `${formatDate(event.start)}, ${startTime} - ${endTime}`;
          const attended = attendance.some((attend) => attend.event.uuid === event.uuid);
          return (
            <EventCard
              key={`upcoming-${event.uuid}`}
              uuid={event.uuid}
              cover={event.cover || background}
              date={date}
              description={event.description}
              location={event.location}
              points={event.pointValue}
              title={event.title}
              canEditEvents={canEditEvents}
              attended={attended}
            />
          );
        })}
      </EventsList>
    </div>
  );
};

export default UpcomingEventsContainer;
