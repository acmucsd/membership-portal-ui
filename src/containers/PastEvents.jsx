import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import background from '../assets/graphics/background.svg';
import { fetchPastEvents } from '../actions/eventsActions';
import { formatDate } from '../utils';

const PastEventsContainer = (props) => {
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

const mapStateToProps = (state) => ({
  events: state.events.pastEvents,
  auth: state.auth,
});

PastEventsContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, { fetchPastEvents })(
  PastEventsContainer
);
