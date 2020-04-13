import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ProfileCard from '../components/ProfileCard';
import { getLevel, getRank } from '../utils';
import { fetchUser } from '../actions/userActions';

const NavProfileContainer = props => {
  useEffect(() => {
    props.fetchUser();
  }, []);

  return (
    <ProfileCard
      exp={props.exp}
      profilePicture={props.profilePicture}
      level={getLevel(props.exp)}
      name={props.name}
      rank={getRank(props.exp)}
    />
  );
***REMOVED***

const mapStateToProps = state => ({
  profilePicture: state.user.profile.profilePicture,
  exp: state.user.profile.points,
  name: state.user.profile.firstName,
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(NavProfileContainer);
