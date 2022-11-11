import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import background from '../../assets/graphics/background.svg';
import { fetchAttendance as fetchAttendanceConnect, fetchFutureEvents as fetchFutureEventsConnect } from '../eventActions';
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
  events: {
    uuid: string;
    cover: string;
    description: string;
    location: string;
    eventLink: string | null;
    pointValue: string;
    title: string;
    start: string;
    end: string;
  }[];
  fetchAttendance: Function;
  fetchFutureEvents: Function;
}

const UpcomingEventsContainer: React.FC<UpcomingEventsContainerProps> = (props) => {
  const { canEditEvents, events, attendance, fetchAttendance, fetchFutureEvents } = props;

  useEffect(() => {
    fetchFutureEvents();
    fetchAttendance();
  }, [fetchAttendance, fetchFutureEvents]);

  return (
    <div>
      <h1 className="subtitle">Upcoming Events</h1>
      <EventsList>
        {events.length === 0 ? (
          <div key="upcoming-none" className="no-events">
            No Events :(
          </div>
        ) : (
          events.map((event) => {
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
          })
        )}
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

export default connect(mapStateToProps, {
  fetchAttendance: fetchAttendanceConnect,
  fetchFutureEvents: fetchFutureEventsConnect,
})(UpcomingEventsContainer);
