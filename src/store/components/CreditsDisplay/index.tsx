import React from 'react';

import DiamondIcon from '../../../assets/icons/diamond-icon.svg';

import './style.less';

interface CreditsDispalyProps {
  value: number;
}

const CreditsDisplay: React.FC<CreditsDispalyProps> = (props) => {
  const { value } = props;

  return (
    <div className="credits-display">
      <img className="credits-icon" src={DiamondIcon} alt="Diamond Icon" />
      <p className="credits-text">{value.toLocaleString('en-US')}</p>
    </div>
  );
};

export default CreditsDisplay;
