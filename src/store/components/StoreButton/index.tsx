import React from 'react';

import './style.less';

interface StoreButtonProps {
  type?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  text: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const StoreButton: React.FC<StoreButtonProps> = (props) => {
  const { type = 'primary', size = 'large', text, disabled, onClick } = props;

  return (
    <button className={`store-button ${disabled ? 'disabled' : type} ${size}`} type="button" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default StoreButton;
