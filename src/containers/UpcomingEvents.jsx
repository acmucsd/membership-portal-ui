import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import { fetchFutureEvents } from '../actions/eventsActions';

const UpcomingEventsContainer = props => {
  useEffect(() => {
    props.fetchFutureEvents();
  });

  return (
    <EventsList>
      {props.events.map((event) => {
        return (
          <EventCard
            key={event.attendanceCode}
            cover={event.cover}
            date={event.start}
            description={event.description}
            location={event.location}
            points={event.pointValue}
            title={event.title}
          />
        );
      })}
    </EventsList>
  );
};

const mapStateToProps = state => ({
  events: state.events.futureEvents,
});

export default connect(
  mapStateToProps,
  { fetchFutureEvents }
)(UpcomingEventsContainer);
