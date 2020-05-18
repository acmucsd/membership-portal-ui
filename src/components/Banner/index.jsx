import React from 'react';

import './style.less';
import DefaultBanner from '../../assets/graphics/default-banner.svg';
import Config from '../../config';

const Banner = () => {
  const onError = (e) => {
    e.target.src = DefaultBanner;
  };

  return (
    <img
      alt="banner"
      className="banner"
      src={Config.banner}
      onError={onError}
    />
  );
};

export default Banner;
