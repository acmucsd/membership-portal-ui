import React from 'react';

import './style.less';
import logo from '../../assets/graphics/logo.svg';

 const AboutPage = () => {
  return (
    <div className="about-page">
      <img src={logo} alt="logo" height="115" width="115" />
      About ACM UCSD
    </div>
  );
};

 export default AboutPage;
