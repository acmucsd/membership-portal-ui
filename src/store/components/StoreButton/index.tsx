import React from 'react';

import './style.less';

interface StoreButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const StoreButton: React.FC<StoreButtonProps> = (props) => {
  const { text, onClick } = props;
  return (
    <button className="store-button" type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default StoreButton;
