import React from 'react';
import { Checkbox } from 'antd';

import './style.less';

interface StoreCheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

const StoreCheckbox: React.FC<StoreCheckboxProps> = (props) => {
  const { checked, disabled, onChange } = props;

  return <Checkbox className="store-checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange && onChange(e.target.value)} />;
};

export default StoreCheckbox;
