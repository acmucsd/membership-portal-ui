import React from 'react';
import Icon from '@ant-design/icons';

import './style.less';
import config from '../../../config';
import logo from '../../../assets/graphics/logo.png';
import { ReactComponent as DiscordIcon } from '../../../assets/icons/discord-icon.svg';
import { ReactComponent as FbIcon } from '../../../assets/icons/fb-icon.svg';
import { ReactComponent as IgIcon } from '../../../assets/icons/ig-icon.svg';
import { ReactComponent as WebIcon } from '../../../assets/icons/web-icon.svg';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="title">
        <img src={logo} alt="logo" height="115" width="115" />
        <h1>
          About <b>ACM@UCSD</b>
        </h1>
      </div>
      <p className="description">{config.about}</p>
      <div className="socials">
        <a href="https://acmucsd.com">
          <Icon component={WebIcon} className="icon" />
          Website
        </a>
        <a href="https://facebook.com/acm.ucsd">
          <Icon component={FbIcon} className="icon" />
          facebook.com/acm.ucsd
        </a>
        <a href="https://instagram.com/acm.ucsd">
          <Icon component={IgIcon} className="icon" />
          instagram.com/acm.ucsd
        </a>
        <a href="https://acmurl.com/discord">
          <Icon component={DiscordIcon} className="icon" />
          Discord
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
