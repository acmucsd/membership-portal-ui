import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const Banner = (props) => {
  return (
    <img className="banner" src={props.src}></img>
  );
};

Banner.propTypes = {
  src: PropTypes.string.isRequired
};

export default Banner;
