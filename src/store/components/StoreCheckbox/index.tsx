import React from 'react';

import './style.less';

interface StoreCheckboxProps {
  value?: string | ReadonlyArray<string> | number;
}

const StoreCheckbox: React.FC<StoreCheckboxProps> = (props) => {
  const { value } = props;

  return <input className="store-checkbox" type="checkbox" value={value} />;
};

export default StoreCheckbox;
