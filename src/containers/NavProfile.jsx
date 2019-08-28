import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import NavProfile from '../components/NavProfile';
import { fetchUser } from '../actions/userActions';

const NavProfileContainer = props => {
  useEffect(() => {
    props.fetchUser();
  });

  return <NavProfile exp={props.exp} image={props.image} name={props.name} menu={props.menu} />;
***REMOVED***

const mapStateToProps = state => ({
  exp: state.user.profile.exp,
  image: state.user.profile.image,
  name: state.user.profile.name,
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(NavProfileContainer);
