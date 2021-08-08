import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

import './style.less';

const NavigationBar: React.FC = () => {
  const history = useHistory();
  return (
    <div className="navigation-bar">
      <h1>Diamond Outfitters</h1>
      <p>10,000</p>
      <Button
        onClick={() => {
          history.push('/store/cart');
        }}
      >
        Check Out
      </Button>
    </div>
  );
};

export default NavigationBar;
