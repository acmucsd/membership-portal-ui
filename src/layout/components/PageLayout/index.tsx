import React from 'react';
import withSizes from 'react-sizes';
import CheckInModal from '../../../event/containers/CheckInModal';
import Header from '../Header';
import NavBarHorizontal from '../NavBarHorizontal';
import NavBarVertical from '../NavBarVertical';
import './style.less';

interface PageLayoutProps {
  children: React.ComponentClass | React.FC;
  hasAdminAccess: boolean;
  hasStoreAdminAccess: boolean;
  isMobile: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = (props) => {
  const { children, hasAdminAccess, hasStoreAdminAccess, isMobile } = props;

  return (
    <>
      <CheckInModal />
      <Header />
      {isMobile ? (
        <>
          <NavBarHorizontal hasAdminAccess={hasAdminAccess} />
          <div className="page-layout-content">{children}</div>
        </>
      ) : (
        <div className="page-layout-content-table">
          <NavBarVertical hasAdminAccess={hasAdminAccess} hasStoreAdminAccess={hasStoreAdminAccess} />
          <div className="page-layout-content">{children}</div>
        </div>
      )}
    </>
  );
};

const mapSizesToProps = ({ width }: { width: number }) => ({
  isMobile: width <= 768,
});

export default withSizes(mapSizesToProps)(PageLayout as any) as any; // TODO
