import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Banner from '../components/Banner';
import fetchBanner from '../actions/bannerActions';

const BannerContainer = (props) => {
  const { src } = props;

  useEffect(() => {
    props.fetchBanner();
  });

  return <Banner src={src} />;
};

const mapStateToProps = (state) => ({
  src: state.banner.url,
});

BannerContainer.propTypes = {
  src: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { fetchBanner })(BannerContainer);
