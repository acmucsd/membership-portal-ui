import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavProfile from '../components/NavProfile';
import { fetchUser } from '../actions/userActions';

const NavProfileContainer = (props) => {
  const { exp, profilePicture, name, menu } = props;

  useEffect(() => {
    props.fetchUser();
  }, []);

  return (
    <NavProfile
      exp={exp}
      profilePicture={profilePicture}
      name={name}
      menu={menu}
    />
  );
};

const mapStateToProps = (state) => ({
  exp: state.user.profile.points,
  profilePicture: state.user.profile.profilePicture,
  name: state.user.profile.firstName,
});

NavProfileContainer.propTypes = {
  exp: PropTypes.number.isRequired,
  profilePicture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  menu: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, { fetchUser })(NavProfileContainer);
