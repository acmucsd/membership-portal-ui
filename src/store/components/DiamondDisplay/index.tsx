import React from 'react';

import DiamondIcon from '../../../assets/icons/diamond-icon.svg';

import './style.less';

interface DiamondDisplayProps {
  prefix?: string;
  value?: number;
  error?: boolean;
  saleValue?: number;
  outOfStock?: boolean;
}

const DiamondDisplay: React.FC<DiamondDisplayProps> = (props) => {
  const { prefix, value = 0, error, saleValue, outOfStock } = props;

  if (outOfStock) {
    return <div className="diamond-display red">Out of Stock</div>;
  }

  if (saleValue) {
    return (
      <div className="diamond-display">
        <span className="diamond-display-value strikethrough">{value.toLocaleString()}</span>
        <span className="diamond-display-value red">{saleValue.toLocaleString()}</span>
        <img src={DiamondIcon} alt="Diamond Icon" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="diamond-display">
        <span className="diamond-display-value red">{value.toLocaleString()}</span>
        <img src={DiamondIcon} alt="Diamond Icon" />
      </div>
    );
  }

  return (
    <div className="diamond-display">
      <span className="diamond-display-value">{`${prefix}${value.toLocaleString()}`}</span>
      <img src={DiamondIcon} alt="Diamond Icon" />
    </div>
  );
};

export default DiamondDisplay;
