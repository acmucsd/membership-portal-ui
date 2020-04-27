import React from 'react';
import LoginLayout from '../../../components/LoginLayout';
import './style.less';
const BreadPageContainer = () => {
  // this is really jank and from stackoverflow i'm sorry
  function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }
  return (
    <div className='BreadPage'>
      <h1>ACM Bread</h1>
      <br />
      <div className='iframe-container'>
        <iframe className='BreadPageFrame' src="https://stonet2000.github.io/Cut-Bread/">
        </iframe>
      </div>
    </div>
  );
};

export default BreadPageContainer;
