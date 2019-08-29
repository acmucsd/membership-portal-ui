import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ProfileCard from '../components/ProfileCard';
import { fetchUser } from '../actions/userActions';

const NavProfileContainer = props => {
  useEffect(() => {
    props.fetchUser();
  });

  return <ProfileCard exp={props.exp} image={props.image} level={props.level} name={props.name} rank={props.rank} />;
};

const mapStateToProps = state => ({
  exp: state.user.profile.exp,
  image: state.user.profile.image,
  level: state.user.profile.level,
  name: state.user.profile.name,
  rank: state.user.profile.rank,
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(NavProfileContainer);
