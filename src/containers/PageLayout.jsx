import React from 'react';
import { connect } from 'react-redux';

import PageLayout from '../components/PageLayout';

const PageLayoutContainer = props => {

  return (
    <PageLayout isAdmin={props.isAdmin}>
      {props.children}
    </PageLayout>
  );
***REMOVED***

const mapStateToProps = state => ({
  isAdmin: state.auth.admin,
});

export default connect(
  mapStateToProps,
  null
)(PageLayoutContainer);
