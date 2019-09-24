import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import { fetchPastEvents } from '../actions/eventsActions';

const PastEventsContainer = props => {
  useEffect(() => {
    props.fetchPastEvents();
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
  events: state.events.pastEvents,
});

export default connect(
  mapStateToProps,
  { fetchPastEvents }
)(PastEventsContainer);
