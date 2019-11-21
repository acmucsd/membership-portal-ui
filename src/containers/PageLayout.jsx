import React from 'react';
import { connect } from 'react-redux';

import PageLayout from '../components/PageLayout';

const PageLayoutContainer = (props) => (
    <PageLayout isAdmin={props.isAdmin}>
      {props.children}
    </PageLayout>
  );

const mapStateToProps = (state) => ({
  isAdmin: state.auth.admin,
});

export default connect(
  mapStateToProps,
  null,
)(PageLayoutContainer);
