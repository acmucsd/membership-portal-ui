import React from 'react';
import { Card } from 'antd';
import './styles.scss';
import eventCover from '../../assets/eventcard__event-cover.png';
import downArrow from '../../assets/eventcard__down-arrow.svg';
import pointsCircle from '../../assets/eventcard__points-circle.svg';

const { Meta } = Card;

const EventCard = () => {
    return (
        <div>
            <Card
                className="event-card"
                cover={<img alt="event cover" src={eventCover} className="temp"/>}
                >
                <img alt="points circle" src={pointsCircle} className="points-circle"/>
                <Meta title="ACM Beginner Track #5: Intro to ML" description="May 18th · CSE 1202 · 10:00am - 3:00pm" />
                
                <img alt="down arrow" src={downArrow} className="down-arrow"/>
            </Card>
        </div>
        
    );
}

export default EventCard;