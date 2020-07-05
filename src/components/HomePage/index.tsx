import React from 'react';

import './style.less';
import EventCheckIn from '../../containers/EventCheckIn';
import PastEvents from '../../containers/PastEvents';
import ProfileCard from '../../containers/ProfileCard';
import UpcomingEvents from '../../containers/UpcomingEvents';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1 className="title">Dashboard</h1>
      <div className="dashboard">
        <ProfileCard />
        <EventCheckIn />
      </div>
      <hr className="border" />
      <h1 className="subtitle">Upcoming Events</h1>
      <UpcomingEvents />
      <hr className="border spaced" />
      <h1 className="subtitle">Past Events</h1>
      <PastEvents />
    </div>
  );
};

export default HomePage;
