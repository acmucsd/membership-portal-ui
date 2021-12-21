import React from 'react';

import './style.less';

interface StoreTextInputProps {
  size: 'Full' | 'Half' | 'Quarter' | 'Field';
  value?: string | ReadonlyArray<string> | number;
  attributeName?: string;
  onChange?: (value: React.ChangeEvent<any>) => void;
  placeholder?: string;
}

const StoreTextInput: React.FC<StoreTextInputProps> = (props) => {
  const { size, value, onChange, attributeName, placeholder } = props;

  if (size === 'Field') {
    return <textarea name={attributeName} className={`store-text-input ${size.toLowerCase()}`} value={value} onChange={(e) => onChange?.(e)} />;
  }
  return (
    <input
      name={attributeName}
      className={`store-text-input ${size.toLowerCase()}`}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e)}
    />
  );
};

export default StoreTextInput;
