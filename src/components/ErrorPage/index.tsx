import React from 'react';

import './style.less';

const ErrorPage: React.FC = () => {
  return (
    <div className="Error-Page">
      <div className="title">
        <h1>ACM</h1>
      </div>
      <h1>404: Whoops, we couldn&apos;t find this page!</h1>
    </div>
  );
};

export default ErrorPage;
