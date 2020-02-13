import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import NavProfile from '../components/NavProfile';
import { fetchUser } from '../actions/userActions';

const NavProfileContainer = props => {
  useEffect(() => {
    props.fetchUser();
  }, []);

  return <NavProfile exp={props.exp} image={props.image} name={props.name} menu={props.menu} />;
};

const mapStateToProps = state => ({
  exp: state.user.profile.points,
  image: state.user.image,
  name: state.user.profile.firstName,
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(NavProfileContainer);
