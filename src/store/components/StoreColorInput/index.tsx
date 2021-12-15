import React from 'react';

import './style.less';

interface StoreColorInputProps {
  value?: string | ReadonlyArray<string> | number;
}

const StoreColorInput: React.FC<StoreColorInputProps> = (props) => {
  const { value } = props;

  return (
    <div className="store-color-input">
      <input className="store-color-input-input" type="color" value={value} />
    </div>
  );
};

export default StoreColorInput;
