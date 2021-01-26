import React from 'react';

import Header from '../Header';

import './style.less';

const BreadPageContainer = () => {
  return (
    <div className="BreadPage">
      <Header />
      <iframe title="Cut Bread" className="BreadPageFrame" src="https://stonet2000.github.io/Cut-Bread/" />
    </div>
  );
};

export default BreadPageContainer;
