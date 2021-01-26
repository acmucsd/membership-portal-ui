import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import background from '../../assets/graphics/background.svg';
import { fetchAttendance as fetchAttendanceConnect, fetchPastEvents as fetchPastEventsConnect } from '../eventActions';
import { formatDate } from '../../utils';

interface PastEventsContainerProps {
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
  auth: {
    admin: boolean;
  };
  events: [
    {
      uuid: string;
      cover: string;
      description: string;
      location: string;
      pointValue: string;
      title: string;
      start: string;
    },
  ];
  fetchAttendance: Function;
  fetchPastEvents: Function;
}

const PastEventsContainer: React.FC<PastEventsContainerProps> = (props) => {
  const { auth, events, attendance, fetchAttendance, fetchPastEvents } = props;

  useEffect(() => {
    fetchPastEvents();
    fetchAttendance();
  }, [fetchAttendance, fetchPastEvents]);

  return (
    <EventsList>
      {events.map((event) => {
        const startTime = formatDate(event.start);
        const attended = attendance.some((attend) => attend.event.uuid === event.uuid);
        return (
          <EventCard
            key={`past-${event.uuid}`}
            uuid={event.uuid}
            cover={event.cover || background}
            date={startTime}
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
  events: state.event.pastEvents,
  auth: state.auth,
  attendance: state.event.attendance,
});

export default connect(mapStateToProps, {
  fetchAttendance: fetchAttendanceConnect,
  fetchPastEvents: fetchPastEventsConnect,
})(PastEventsContainer);
