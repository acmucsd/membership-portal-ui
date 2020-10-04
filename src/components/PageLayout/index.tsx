import React, { ComponentType } from 'react';
import withSizes from 'react-sizes';

import CheckInModal from '../../containers/CheckInModal';
import NavBarHorizontal from '../NavBarHorizontal';
import NavBarVertical from '../NavBarVertical';
import TopBar from '../TopBar';

import './style.less';

interface PageLayoutProps {
  children: React.ComponentClass | React.FC;
  isAdmin: boolean;
  isMobile: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = (props) => {
  const { children, isAdmin, isMobile } = props;

  return (
    <>
      <CheckInModal />
      <TopBar />
      {isMobile ? (
        <>
          <NavBarHorizontal />
          <div className="content">{children}</div>
        </>
      ) : (
        <div className="content-table">
          <NavBarVertical isAdmin={isAdmin} />
          <div className="content">{children}</div>
        </div>
      )}
    </>
  );
};

const mapSizesToProps = ({ width }: { width: number }) => ({
  isMobile: width < 768,
});

export default withSizes(mapSizesToProps)(
  PageLayout as ComponentType<{ isMobile: boolean }>,
) as React.FC<any & { isAdmin: boolean; children: React.ComponentClass | React.FC }>;
