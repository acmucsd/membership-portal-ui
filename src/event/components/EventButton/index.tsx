import React from 'react';
import { Link } from 'react-router-dom';

import { isURL, getAbsoluteURL } from '../../../utils';

import GeneralLogo from '../../../assets/graphics/logo.png';
import AILogo from '../../../assets/icons/ai.svg';
import CyberLogo from '../../../assets/icons/cyber.svg';
import HackLogo from '../../../assets/icons/hack.svg';
import InnovateLogo from '../../../assets/icons/innovate.svg';

import './styles.less';

interface EventButtonProps {
  cover: string;
  date: string;
  description: string;
  committee: string;
  location: string;
  eventLink: string | null;
  title: string;
  uuid: string;
}

const EventButton: React.FC<EventButtonProps> = (props) => {
  const { date, committee, location, title, uuid } = props;

  const renderCommunityLogo = (community: string) => {
    switch (community) {
      case 'AI':
        return AILogo;
      case 'Cyber':
        return CyberLogo;
      case 'Hack':
        return HackLogo;
      case 'Innovate':
        return InnovateLogo;
      default:
        return GeneralLogo;
    }
  };

  return (
    <Link className="event-button" to={`/admin/checkInMember/${uuid}`}>
      <div className="front-facing">
        <div className="info">
          <h2 className="title">{title}</h2>
          <p className="date">{date}</p>
          {isURL(location) ? (
            <a className="link" href={getAbsoluteURL(location)}>
              <p className="location">{location}</p>
            </a>
          ) : (
            <p className="location">{location}</p>
          )}
          <div className="suborg">
            <img src={renderCommunityLogo(committee)} alt={`ACM ${committee === 'ACM' ? 'General' : committee} Logo`} />
            <p>
              <strong>ACM</strong> {committee === 'ACM' ? 'General' : committee}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventButton;
