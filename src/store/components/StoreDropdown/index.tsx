import React from 'react';

import Dropdown, { Option, Group } from 'react-dropdown';
import 'react-dropdown/style.css';

import './style.less';

interface StoreDropdownProps {
  options: (Group | Option | string)[];
  disabled?: boolean;
  onChange?: (arg: Option) => void;
  onFocus?: (arg: boolean) => void;
  value?: Option | string;
  placeholder?: String;
  error?: string | false | undefined;
}

const StoreDropdown: React.FC<StoreDropdownProps> = (props) => {
  const { options, disabled, onChange, onFocus, value, placeholder, error } = props;

  return (
    <div className="store-dropdown">
      <Dropdown
        controlClassName="store-dropdown-control"
        placeholderClassName="store-dropdown-placeholder"
        menuClassName="store-dropdown-menu"
        arrowClassName="store-dropdown-arrow"
        options={options}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        value={value}
        placeholder={placeholder}
      />
      {error && <div className="store-dropdown-error">{error}</div>}
    </div>
  );
};

export default StoreDropdown;
