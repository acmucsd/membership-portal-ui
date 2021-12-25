import React from 'react';

import './style.less';

interface StoreColorInputProps {
  value?: string | ReadonlyArray<string> | number;
  onChange?: (value: React.ChangeEvent<any>) => void;
  attributeName?: string;
}

const StoreColorInput: React.FC<StoreColorInputProps> = (props) => {
  const { value, onChange, attributeName } = props;

  return (
    <div className="store-color-input">
      <input name={attributeName} className="store-color-input-input" type="color" value={value} onChange={(e) => onChange && onChange(e)} />
    </div>
  );
};

export default StoreColorInput;
