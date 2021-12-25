import React from 'react';
import { Checkbox } from 'antd';

import './style.less';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface StoreCheckboxProps {
  attributeName?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: CheckboxChangeEvent) => void;
}

const StoreCheckbox: React.FC<StoreCheckboxProps> = (props) => {
  const { checked, disabled, onChange, attributeName } = props;

  return <Checkbox name={attributeName} className="store-checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e)} />;
};

export default StoreCheckbox;
