import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileCard from '../components/ProfileCard';
import { getLevel, getRank } from '../utils';
import { fetchUser } from '../actions/userActions';

const NavProfileContainer = (props) => {
  const { profilePicture, name, exp } = props;

  useEffect(() => {
    props.fetchUser();
  }, []);

  return (
    <ProfileCard
      exp={exp}
      profilePicture={profilePicture}
      level={getLevel(exp)}
      name={name}
      rank={getRank(exp)}
    />
  );
};

const mapStateToProps = (state) => ({
  profilePicture: state.user.profile.profilePicture,
  exp: state.user.profile.points,
  name: state.user.profile.firstName,
});

NavProfileContainer.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  exp: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, { fetchUser })(NavProfileContainer);
