import React from 'react';

import './style.less';
import EventCheckIn from '../../../event/containers/EventCheckIn';
import PastEvents from '../../../event/containers/PastEvents';
import ProfileCard from '../../../profile/containers/ProfileCard';
import UpcomingEvents from '../../../event/containers/UpcomingEvents';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1 className="title">Dashboard</h1>
      <div className="dashboard">
        <ProfileCard />
        <EventCheckIn />
      </div>
      <h1 className="subtitle">Upcoming Events</h1>
      <UpcomingEvents />
      <h1 className="subtitle">Past Events</h1>
      <PastEvents />
    </div>
  );
};

export default HomePage;
