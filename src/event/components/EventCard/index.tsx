import { Icon } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { isURL, getAbsoluteURL } from '../../../utils';

import './styles.less';

interface EventCardProps {
  attended: boolean;
  canEditEvents: boolean;
  cover: string;
  date: string;
  description: string;
  location: string;
  points: string;
  title: string;
  uuid: string;
}

const EventCard: React.FC<EventCardProps> = (props) => {
  const { attended, canEditEvents, cover, date, description, location, points, title, uuid } = props;
  const history = useHistory();

  return (
    <div className="event-card">
      <div className="front-facing">
        <LazyLoadImage className="image" src={cover} alt={title} />
        <div className="info">
          <h2 className="title">{title}</h2>
          <p className="date">{date}</p>
          {isURL(location) ? (
            <a className="link" href={getAbsoluteURL(location)}>
              <p className="location">{location}</p>
            </a>
          ) : (
            <p className="location">{location}</p>
          )}
        </div>
        <div className={`circle ${attended ? 'green' : 'blue'}`}>
          <div className="inner" />
          <h2 className="points">{points}</h2>
        </div>
        {canEditEvents && (
          <div className="edit-icon-wrapper">
            <Icon
              type="edit"
              className="edit-icon"
              onClick={() => {
                history.push(`/admin/editEvent/${uuid}`);
              }}
            />
          </div>
        )}
        <hr className="divider" />
      </div>
      <p className="description">{description}</p>
    </div>
  );
};

export default EventCard;
