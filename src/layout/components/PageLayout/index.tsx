import React from 'react';
import { connect } from 'react-redux';
import withSizes from 'react-sizes';

import CheckInModal from '../../../event/containers/CheckInModal';
import Header from '../Header';
import NavBarHorizontal from '../NavBarHorizontal';
import NavBarVertical from '../NavBarVertical';

import { logoutUser } from '../../../auth/authActions';

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
          <NavBarHorizontal isAdmin={isAdmin} />
          <div className="page-layout-content">{children}</div>
        </>
      ) : (
        <div className="page-layout-content-table">
          <NavBarVertical isAdmin={isAdmin} logout={logoutUser} />
          <div className="page-layout-content">{children}</div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  isAdmin: state.auth.admin,
});

const mapSizesToProps = ({ width }: { width: number }) => ({
  isMobile: width < 768,
});

export default withSizes(mapSizesToProps)(connect(mapStateToProps)(PageLayout) as any) as any; // TODO
