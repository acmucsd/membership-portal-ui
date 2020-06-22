import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

interface EventList {
  children: React.ReactChildren | React.ReactChild[]
}

const EventsList: React.FC<EventList> = (props) => {
  const { children } = props;
  return <div className="events-list">{children}</div>;
};

export default EventsList;
