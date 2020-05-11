import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const EventsList = (props) => {
  const { children } = props;
  return <div className="events-list">{children}</div>;
};

EventsList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EventsList;
