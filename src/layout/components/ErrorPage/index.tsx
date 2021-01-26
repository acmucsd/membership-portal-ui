import React from 'react';

import cat404 from '../../../assets/graphics/cat404.png';

import './style.less';

const ErrorPage: React.FC = () => {
  return (
    <div className="Error-Page">
      <h1 className="title">404 Page</h1>
      <br />
      <h2>Whoops, we couldn&apos;t find this page!</h2>
      <br />
      <img src={cat404} alt="sad cat" />
    </div>
  );
};

export default ErrorPage;
