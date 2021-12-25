import React from 'react';
import { Link } from 'react-router-dom';

import './style.less';

interface StoreButtonProps {
  type?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  text: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  link?: string;
  submittable?: boolean;
}

const StoreButton: React.FC<StoreButtonProps> = (props) => {
  const { type = 'primary', size = 'large', text, disabled, onClick, link, submittable = false } = props;

  if (link) {
    if (disabled) {
      return <div className={`store-button disabled ${size}`}>{text}</div>;
    }

    return (
      <Link className={`store-button-link ${size}`} to={link}>
        <div className={`store-button ${type} ${size}`}>{text}</div>
      </Link>
    );
  }

  return (
    <button
      className={`store-button ${disabled ? 'disabled' : type} ${size}`}
      type={submittable ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default StoreButton;
