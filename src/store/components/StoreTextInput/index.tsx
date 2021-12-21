import React from 'react';

import './style.less';

interface StoreTextInputProps {
  size: 'Full' | 'Half' | 'Quarter' | 'Field';
  value?: string | ReadonlyArray<string> | number;
  attributeName?: string;
  onChange?: (value: React.ChangeEvent<any>) => void;
}

const StoreTextInput: React.FC<StoreTextInputProps> = (props) => {
  const { size, value, onChange, attributeName } = props;

  if (size === 'Field') {
    return (
      <textarea
        name={attributeName}
        className={`store-text-input ${size.toLowerCase()}`}
        value={value}
        onChange={(e) => onChange && onChange(e)}
        // onChange={(e) => onChange && onChange(e.target.value)}
      />
    );
  }
  return (
    <input
      name={attributeName}
      className={`store-text-input ${size.toLowerCase()}`}
      type="text"
      value={value}
      onChange={(e) => onChange && onChange(e)}
      // onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
};

export default StoreTextInput;
