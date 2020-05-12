import React from 'react';
import PropTypes from 'prop-types';

import './style.less';
import DefaultBanner from '../../assets/graphics/default-banner.svg';

const Banner = (props) => {
  const onError = (e) => {
    e.target.src = DefaultBanner;
  };

  const { src } = props;

  return <img alt="banner" className="banner" src={src} onError={onError} />;
};

Banner.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Banner;
