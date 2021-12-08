import React from 'react';

import './style.less';

interface StoreTextInputProps {
  size: 'Full' | 'Half' | 'Quarter' | 'Field';
  value?: string | ReadonlyArray<string> | number;
}

const StoreTextInput: React.FC<StoreTextInputProps> = (props) => {
  const { size, value } = props;

  if (size === 'Field') {
    return <textarea className={`store-text-input ${size.toLowerCase()}`} value={value} />;
  }
  return <input className={`store-text-input ${size.toLowerCase()}`} type="text" value={value} />;
};

export default StoreTextInput;
