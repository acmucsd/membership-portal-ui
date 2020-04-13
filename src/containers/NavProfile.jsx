import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import NavProfile from '../components/NavProfile';
import { fetchUser } from '../actions/userActions';

const NavProfileContainer = props => {
  useEffect(() => {
    props.fetchUser();
  }, []);

  return <NavProfile exp={props.exp} profilePicture={props.profilePicture} name={props.name} menu={props.menu} />;
***REMOVED***

const mapStateToProps = state => ({
  exp: state.user.profile.points,
  profilePicture: state.user.profile.profilePicture,
  name: state.user.profile.firstName,
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(NavProfileContainer);
