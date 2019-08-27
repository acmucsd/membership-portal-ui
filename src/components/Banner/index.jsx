import React from 'react';
import PropTypes from 'prop-types';

import './style.less';
import DefaultBanner from '../../assets/graphics/default-banner.svg';

const Banner = props => {
  const onError = e => {
    console.log('error');
    e.target.src = DefaultBanner;
  };

  return <img alt="banner" className="banner" src={props.src} onError={onError} />;
};

Banner.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Banner;
