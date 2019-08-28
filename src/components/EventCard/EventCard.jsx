import { Card } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.less';

const { Meta } = Card;

const EventCard = (props) => {
  return (
    <div>
      <Card
        className="event-card"
        cover={<img alt="event cover" src={props.eventCoverImage}/>}
      >
        <img alt="points circle" src={props.pointsCircleImage} className="points-circle"/>
        <Meta title={props.title} description={props.description} />	
        <img alt="down arrow" src={props.downArrowImage} className="down-arrow"/>
      </Card>
    </div>
  );
}

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  downArrowImage: PropTypes.string.isRequired,
  eventCoverImage: PropTypes.string.isRequired,
  pointsCircleImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
***REMOVED***

export default EventCard;