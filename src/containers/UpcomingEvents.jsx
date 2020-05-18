import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import background from '../assets/graphics/background.svg';
import { fetchFutureEvents } from '../actions/eventsActions';
import { formatDate } from '../utils';

const UpcomingEventsContainer = props => {
  useEffect(() => {
    props.fetchFutureEvents();
  }, []);

  return (
    <EventsList>
      {props.events.map(event => {
        const startTime = formatDate(event.start);
        return (
          <EventCard
            key={`upcoming-${event.uuid}`}
            uuid={event.uuid}
            cover={event.cover || background}
            date={startTime}
            description={event.description}
            location={event.location}
            points={event.pointValue}
            title={event.title}
            auth={props.auth}
          />
        );
      })}
    </EventsList>
  );
};

const mapStateToProps = state => ({
  events: state.events.futureEvents,
  auth: state.auth,
});

export default connect(mapStateToProps, { fetchFutureEvents })(UpcomingEventsContainer);
