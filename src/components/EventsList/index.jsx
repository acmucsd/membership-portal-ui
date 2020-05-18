import React from 'react';

import './style.less';

const EventsList = props => {
  return <div className="events-list">{props.children}</div>;
};

export default EventsList;
