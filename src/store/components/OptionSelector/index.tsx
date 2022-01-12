import React, { useState } from 'react';

import './style.less';

type Option = { key: string; label: string; value: any };
interface OptionSelectorProps {
  options: Option[];
  onChange: (option: Option) => void;
  disabled?: boolean;
  initialOption?: string;
}

const OptionSelector: React.FC<OptionSelectorProps> = (props) => {
  const { options, onChange, disabled = false, initialOption = '' } = props;

  const [current, setCurrent] = useState<string>(initialOption);

  return (
    <div className="option-selector">
      {options.map((option) => {
        return (
          <button
            className={option.key === current ? 'option selected' : 'option'}
            type="button"
            key={option.key}
            disabled={disabled}
            onClick={() => {
              setCurrent(option.key);
              onChange(option);
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default OptionSelector;
