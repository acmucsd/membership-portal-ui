import React, { useContext, useEffect } from 'react';
import background from '../../assets/graphics/background.svg';
import { AppContext } from '../../context';
import { UserAccessType } from '../../types';
import { formatDate, formatTime } from '../../utils';
import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import { fetchAttendance, fetchFutureEvents } from '../utils';

const UpcomingEventsContainer: React.FC = () => {
  const { futureEvents, setFutureEvents, attendance, setAttendance, user } = useContext(AppContext);

  useEffect(() => {
    fetchFutureEvents().then(setFutureEvents);
    fetchAttendance().then(setAttendance);
  }, [setAttendance, setFutureEvents]);

  // Since user can be undefined if the call to load the user fails, it must be
  // checked before use.
  if (!user) {
    return null;
  }

  const { accessType } = user;
  const canEditEvents = [UserAccessType.MARKETING, UserAccessType.ADMIN].includes(accessType);

  return (
    <div>
      <h1 className="subtitle">Upcoming Events</h1>
      <EventsList>
        {futureEvents.map((event) => {
          const startDate = formatDate(event.start);
          const startTime = formatTime(event.start);
          const endDate = formatDate(event.end);
          const endTime = formatTime(event.end);
          const date = startDate === endDate ? `${startDate}, ${startTime} - ${endTime}` : `${startDate}, ${startTime} - ${endDate}, ${endTime}`;
          const attended = attendance.some((attend) => attend.event.uuid === event.uuid);
          return (
            <EventCard
              key={`upcoming-${event.uuid}`}
              uuid={event.uuid}
              cover={event.cover || background}
              date={date}
              description={event.description}
              location={event.location}
              eventLink={event.eventLink}
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
