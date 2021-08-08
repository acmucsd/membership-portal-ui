import React, { useState } from 'react';

import './style.less';

interface OptionSelectorProps {
  options: { key: string; value: string }[];
  optionSelected: Function;
  enabled?: boolean;
  initialOption?: string;
}

const OptionSelector: React.FC<OptionSelectorProps> = (props) => {
  const { options, optionSelected, enabled = true, initialOption } = props;

  const [current, setCurrent] = useState<string | undefined>(initialOption);

  return (
    <div className="option-selector">
      {options.map((option) => {
        return (
          <button
            className={`option${option.key === current ? ' selected' : ''}`}
            type="button"
            key={option.key}
            disabled={!enabled ? true : undefined}
            onClick={() => {
              setCurrent(option.key);
              optionSelected(option);
            }}
          >
            {option.value}
          </button>
        );
      })}
    </div>
  );
};

export default OptionSelector;
