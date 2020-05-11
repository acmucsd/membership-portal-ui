import React from 'react';
import './style.less';

const BreadPageContainer = () => {
  // jank iframes
  return (
    <div className="BreadPage">
      <h1>ACM Bread</h1>
      <br />
      <div className="iframe-container">
        <iframe
          title="Cut Bread"
          className="BreadPageFrame"
          src="https://stonet2000.github.io/Cut-Bread/"
        />
      </div>
    </div>
  );
};

export default BreadPageContainer;
