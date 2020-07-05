import React from 'react';
import Iframe from 'react-iframe';

import './style.less';

const DiscordPage = () => {
  const ReactIframe = Iframe as React.ComponentClass<any>;
  return (
    <div className="discord-page">
      <h1 className="title">Discord</h1>
      <ReactIframe
        url="https://discordapp.com/widget?id=573028991527550986&theme=light"
        width="350px"
        height="500px"
        display="initial"
        position="relative"
        allowtransparency="true"
        frameborder="0"
      />
    </div>
  );
};

export default DiscordPage;
