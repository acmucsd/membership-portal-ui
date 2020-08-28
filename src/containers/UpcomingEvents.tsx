import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import background from '../assets/graphics/background.svg';
import { fetchAttendance, fetchFutureEvents } from '../actions/eventsActions';
import { formatDate, formatTime } from '../utils';

interface UpcomingEventsContainerProps {
  attendance: [
    {
      uuid: string;
      user: string;
      event: string;
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
  const { auth, events, attendance } = props;

  useEffect(() => {
    props.fetchFutureEvents();
    props.fetchAttendance();
  }, []);

  return (
    <EventsList>
      {events.map((event) => {
        const startTime = formatTime(event.start);
        const endTime = formatTime(event.end);
        const date = `${formatDate(event.start)}, ${startTime} - ${endTime}`;
        const attended = attendance.some((attend) => attend.event === event.uuid);
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
  events: state.events.futureEvents,
  auth: state.auth,
  attendance: state.events.attendance,
});

export default connect(mapStateToProps, { fetchAttendance, fetchFutureEvents })(
  UpcomingEventsContainer,
);
