import React, { ComponentType } from 'react';
import withSizes from 'react-sizes';

import CheckInModal from '../../../event/containers/CheckInModal';
import Header from '../Header';
import NavBarHorizontal from '../NavBarHorizontal';
import NavBarVertical from '../NavBarVertical';

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
      <Header />
      {isMobile ? (
        <>
          <NavBarHorizontal />
          <div className="page-layout-content">{children}</div>
        </>
      ) : (
        <div className="content-table">
          <NavBarVertical isAdmin={isAdmin} />
          <div className="page-layout-content">{children}</div>
        </div>
      )}
    </>
  );
};

const mapSizesToProps = ({ width }: { width: number }) => ({
  isMobile: width < 768,
});

export default withSizes(mapSizesToProps)(PageLayout as ComponentType<{ isMobile: boolean }>) as React.FC<
  any & { isAdmin: boolean; children: React.ComponentClass | React.FC }
>;
