import React from 'react';

import './style.less';

const EventsList = (props) => (
  <div className="events-list">
    {props.children}
  </div>
);

export default EventsList;
