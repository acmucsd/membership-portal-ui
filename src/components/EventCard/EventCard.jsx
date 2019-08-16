import { Card } from 'antd';
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
				<img alt="points circle" src={props.pointsCircle} className="points-circle"/>
				<Meta title="ACM Beginner Track #5: Intro to ML" description="May 18th · CSE 1202 · 10:00am - 3:00pm" />
				
				<img alt="down arrow" src={props.downArrow} className="down-arrow"/>
			</Card>
		</div>
	);
}

export default EventCard;