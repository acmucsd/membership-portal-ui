import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import background from '../assets/graphics/background.svg';
import { fetchPastEvents } from '../actions/eventsActions';
import { formatDate } from '../utils';

interface PastEventsContainerProps {
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
  fetchPastEvents: Function;
}

const PastEventsContainer: React.FC<PastEventsContainerProps> = (props) => {
  const { auth, events } = props;

  useEffect(() => {
    props.fetchPastEvents();
  }, []);

  return (
    <EventsList>
      {events.map((event) => {
        const startTime = formatDate(event.start);
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
          />
        );
      })}
    </EventsList>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  events: state.events.pastEvents,
  auth: state.auth,
});

export default connect(mapStateToProps, { fetchPastEvents })(PastEventsContainer);
