import React from 'react';
import PropTypes from 'prop-types';

import './style.less';
import DefaultBanner from '../../assets/graphics/default-banner.svg';

const Banner = props => {
  const onError = e => {
    e.target.src = DefaultBanner;
  ***REMOVED***

  return <img alt="banner" className="banner" src={props.src} onError={onError} />;
***REMOVED***

Banner.propTypes = {
  src: PropTypes.string.isRequired,
***REMOVED***

export default Banner;
