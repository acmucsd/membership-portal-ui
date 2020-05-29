import React from 'react';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';

import './style.less';
import DefaultBanner from '../../assets/graphics/default-banner.svg';

const Banner = (props) => {
  const { isMobile } = props;

  const onError = (e) => {
    e.target.src = DefaultBanner;
  };

  return (
    <img
      alt="banner"
      className="banner"
      src={
        isMobile
          ? 'https://acmucsd.s3-us-west-1.amazonaws.com/portal/static/banner_s.png'
          : 'https://acmucsd.s3-us-west-1.amazonaws.com/portal/static/banner_l.png'
      }
      onError={onError}
    />
  );
};

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 768,
});

Banner.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default withSizes(mapSizesToProps)(Banner);
