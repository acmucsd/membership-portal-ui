import { Progress, Icon } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { isURL, getAbsoluteURL } from '../../utils';

import './styles.less';

const EventCard = props => {
  const history = useHistory();

  let location = <p className="location">{props.location}</p>;
  if (isURL(props.location)) {
    location = (
      <a className="link" href={getAbsoluteURL(props.location)}>
        {location}
      </a>
    );
  }

  return (
    <div className="event-card">
      <img className="image" src={props.cover} alt={props.title} />
      <div className="info">
        <h2 className="title">{props.title}</h2>
        <p className="date">{props.date}</p>
        {location}
      </div>
      <div className="circle">
        <div className="inner" />
        <h2 className="points">{props.points}</h2>
      </div>
      {props.auth.admin && (
        <div className="edit-icon-wrapper">
          <Icon
            type="edit"
            className="edit-icon"
            onClick={() => {
              history.push('/admin/editEvent/' + props.uuid);
            }}
          />
        </div>
      )}
      <hr className="divider" />
      <p className="description">{props.description}</p>
    </div>
  );
};

EventCard.propTypes = {
  cover: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default EventCard;
