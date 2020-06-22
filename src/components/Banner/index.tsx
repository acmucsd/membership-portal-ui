import React, { SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';

import './style.less';
import Config from '../../config';
import DefaultBanner from '../../assets/graphics/default-banner.svg';

interface BannerProps {
  isMobile: boolean
}

const Banner: React.FC<BannerProps> = (props) => {
  const { isMobile } = props;

  const onError = (e: SyntheticEvent) => {
    (e.target as any).src = DefaultBanner;
  };

  return (
    <img
      alt="banner"
      className="banner"
      src={
        isMobile
          ? `${Config.AWS_URL}/static/banner_s.png`
          : `${Config.AWS_URL}/static/banner_l.png`
      }
      onError={onError}
    />
  );
};

const mapSizesToProps = ({ width }: { width: number }) => ({
  isMobile: width < 768,
});

export default withSizes(mapSizesToProps)(Banner);
