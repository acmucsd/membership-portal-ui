import React from 'react';

import './style.less';
import EventCheckIn from '../../containers/EventCheckIn';
import ProfileCard from '../../containers/ProfileCard';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="title">Dashboard</h1>
      <div className="dashboard">
        <ProfileCard />
        <EventCheckIn />
        <hr className="border"></hr>
      </div>
    </div>
  );
***REMOVED***

 export default HomePage;
