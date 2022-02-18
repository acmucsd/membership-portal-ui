import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import background from '../../assets/graphics/background.svg';
import { fetchAttendance, fetchFutureEvents } from '../eventActions';
import { formatDate, formatTime } from '../../utils';
import { UserAccessType } from '../../types';

interface UpcomingEventsContainerProps {
  attendance: [
    {
      uuid: string;
      user: string;
      event: {
        uuid: string;
        cover: string;
        description: string;
        location: string;
        pointValue: string;
        title: string;
        start: string;
      };
    },
  ];
  canEditEvents: boolean;
  events: [
    {
      uuid: string;
      cover: string;
      description: string;
      location: string;
      pointValue: string;
      title: string;
      start: string;
      end: string;
    },
  ];
}

const UpcomingEventsContainer: React.FC<UpcomingEventsContainerProps> = (props) => {
  const { canEditEvents, events, attendance } = props;

  useEffect(() => {
    fetchFutureEvents();
    fetchAttendance();
  }, []);

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

const mapStateToProps = (state: { [key: string]: any }) => ({
  events: state.event.futureEvents,
  auth: state.auth,
  attendance: state.event.attendance,
  canEditEvents: [UserAccessType.MARKETING, UserAccessType.ADMIN].includes(state.auth.profile.accessType),
});

export default connect(mapStateToProps)(UpcomingEventsContainer);
