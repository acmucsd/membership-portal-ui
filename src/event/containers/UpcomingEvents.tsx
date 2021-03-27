import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import background from '../../assets/graphics/background.svg';
import { fetchAttendance as fetchAttendanceConnect, fetchFutureEvents as fetchFutureEventsConnect } from '../eventActions';
import { formatDate, formatTime } from '../../utils';

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
  auth: boolean;
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
  fetchAttendance: Function;
  fetchFutureEvents: Function;
}

const UpcomingEventsContainer: React.FC<UpcomingEventsContainerProps> = (props) => {
  const { auth, events, attendance, fetchAttendance, fetchFutureEvents } = props;

  useEffect(() => {
    fetchFutureEvents();
    fetchAttendance();
  }, [fetchAttendance, fetchFutureEvents]);

  return (
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
            auth={auth}
            attended={attended}
          />
        );
      })}
    </EventsList>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  events: state.event.futureEvents,
  auth: state.auth,
  attendance: state.event.attendance,
});

export default connect(mapStateToProps, {
  fetchAttendance: fetchAttendanceConnect,
  fetchFutureEvents: fetchFutureEventsConnect,
})(UpcomingEventsContainer);
