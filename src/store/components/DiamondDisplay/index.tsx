import React from 'react';

import DiamondIcon from '../../../assets/icons/diamond-icon.svg';

import './style.less';

interface DiamondDisplayProps {
  value?: number;
  error?: boolean;
  saleValue?: number;
  outOfStock?: boolean;
}

const DiamondDisplay: React.FC<DiamondDisplayProps> = (props) => {
  const { value, error, saleValue, outOfStock } = props;

  if (outOfStock) {
    return <div className="diamond-display red">Out of Stock</div>;
  }

  if (saleValue) {
    return (
      <div className="diamond-display">
        <span className="diamond-display-value strikethrough">{value}</span>
        <span className="diamond-display-value red">{saleValue}</span>
        <img src={DiamondIcon} alt="Diamond Icon" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="diamond-display">
        <span className="diamond-display-value red">{value}</span>
        <img src={DiamondIcon} alt="Diamond Icon" />
      </div>
    );
  }

  return (
    <div className="diamond-display">
      <span className="diamond-display-value">{value}</span>
      <img src={DiamondIcon} alt="Diamond Icon" />
    </div>
  );
};

export default DiamondDisplay;
