import PropTypes from 'prop-types';
import React from 'react';
import withSizes from 'react-sizes';
import { NavLink } from 'react-router-dom';

import Banner from '../../containers/Banner';
import NavDropdown from '../../containers/NavDropdown';
import NavProfile from '../../containers/NavProfile';
import NavBarHorizontal from '../NavBarHorizontal';
import NavBarVertical from '../NavBarVertical';

import logo from '../../assets/graphics/logo.svg';

import './style.less';

const PageLayout = props => {
  return (
    <>
      <div className="header">
        <NavLink className="title" to="/">
          <img alt="ACM" id="logo" src={logo} />
          <span className="heading">ACM@UCSD</span>
          <span className={props.isMobile ? 'hidden' : 'subheading'}>&nbsp;Membership Portal</span>
        </NavLink>
        <div className="profile">
          <NavProfile menu={<NavDropdown />} />
        </div>
      </div>
      <Banner />
      {props.isMobile ? (
        <>
          <NavBarHorizontal />
          <div className="content">{props.children}</div>
        </>
  ***REMOVED*** : (
        <div className="content-table">
          <NavBarVertical isAdmin={props.isAdmin} />
          <div className="content">{props.children}</div>
        </div>
  ***REMOVED***}
    </>
  );
***REMOVED***

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 768,
});

PageLayout.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
***REMOVED***

export default withSizes(mapSizesToProps)(PageLayout);
