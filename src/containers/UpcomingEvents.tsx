import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import background from '../assets/graphics/background.svg';
import { fetchFutureEvents } from '../actions/eventsActions';
import { formatDate, formatTime } from '../utils';

interface UpcomingEventsContainerProps {
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
  fetchFutureEvents: Function;
}

const UpcomingEventsContainer: React.FC<UpcomingEventsContainerProps> = (props) => {
  const { auth, events } = props;

  useEffect(() => {
    props.fetchFutureEvents();
  }, []);

  return (
    <EventsList>
      {events.map((event) => {
        const startTime = formatTime(event.start);
        const endTime = formatTime(event.end);
        const date = `${formatDate(event.start)}, ${startTime} - ${endTime}`;
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
          />
        );
      })}
    </EventsList>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  events: state.events.futureEvents,
  auth: state.auth,
});

export default connect(mapStateToProps, { fetchFutureEvents })(UpcomingEventsContainer);
