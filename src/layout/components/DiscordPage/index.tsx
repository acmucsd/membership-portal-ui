import React from 'react';
import Iframe from 'react-iframe';
import ThemeContext from '../../../styles/ThemeContext/themeContext';

import './style.less';

const DiscordPage = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const ReactIframe = Iframe as React.ComponentClass<any>;
  return (
    <div className="discord-page">
      <h1 className="title">Discord</h1>
      <ReactIframe
        url={"https://discordapp.com/widget?id=573028991527550986&theme=" + theme}
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
