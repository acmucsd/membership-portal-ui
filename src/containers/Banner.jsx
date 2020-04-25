import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Banner from '../components/Banner';
import { fetchBanner } from '../actions/bannerActions';

const BannerContainer = props => {
  useEffect(() => {
    props.fetchBanner();
  });

  return <Banner src={props.src} />;
};

const mapStateToProps = state => ({
  src: state.banner.url,
});

export default connect(mapStateToProps, { fetchBanner })(BannerContainer);
