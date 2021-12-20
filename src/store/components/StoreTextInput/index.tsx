import React from 'react';

import './style.less';

interface StoreTextInputProps {
  size: 'Full' | 'Half' | 'Quarter' | 'Field';
  value?: string | ReadonlyArray<string> | number;
  onChange?: (value: string) => void;
}

const StoreTextInput: React.FC<StoreTextInputProps> = (props) => {
  const { size, value, onChange } = props;

  if (size === 'Field') {
    return <textarea className={`store-text-input ${size.toLowerCase()}`} value={value} onChange={(e) => onChange && onChange(e.target.value)} />;
  }
  return (
    <input className={`store-text-input ${size.toLowerCase()}`} type="text" value={value} onChange={(e) => onChange && onChange(e.target.value)} />
  );
};

export default StoreTextInput;
