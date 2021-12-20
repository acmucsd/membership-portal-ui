import React from 'react';

import './style.less';

interface StoreColorInputProps {
  value?: string | ReadonlyArray<string> | number;
  onChange?: (value: string) => void;
}

const StoreColorInput: React.FC<StoreColorInputProps> = (props) => {
  const { value, onChange } = props;

  return (
    <div className="store-color-input">
      <input className="store-color-input-input" type="color" value={value} onChange={(e) => onChange && onChange(e.target.value)} />
    </div>
  );
};

export default StoreColorInput;
