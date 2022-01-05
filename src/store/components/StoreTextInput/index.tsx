import React from 'react';

import './style.less';

interface StoreTextInputProps {
  size: 'Full' | 'Half' | 'Quarter' | 'Field';
  value?: string | ReadonlyArray<string> | number;
  attributeName?: string;
  onChange?: (value: React.ChangeEvent<any>) => void;
  placeholder?: string;
  error?: string | false | undefined;
}

const StoreTextInput: React.FC<StoreTextInputProps> = (props) => {
  const { size, value, onChange, attributeName, placeholder, error } = props;

  if (size === 'Field') {
    return (
      <div className="store-text">
        <textarea name={attributeName} className={`store-text-input ${size.toLowerCase()}`} value={value} onChange={(e) => onChange?.(e)} />
        <p className="store-text-error">{error}</p>
      </div>
    );
  }
  return (
    <div className="store-text">
      <input
        name={attributeName}
        className={`store-text-input ${size.toLowerCase()}`}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e)}
      />
      {error && <p className="store-text-error">{error}</p>}
    </div>
  );
};

export default StoreTextInput;
