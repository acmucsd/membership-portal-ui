import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavProfile from '../components/NavProfile';
import { fetchUser } from '../actions/userActions';

interface NavProfileContainerProps {
  exp: number,
  profilePicture: string,
  name: string,
  menu: React.ComponentClass | React.FC,
  fetchUser: Function,
};

const NavProfileContainer: React.FC<NavProfileContainerProps> = (props) => {
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

const mapStateToProps = (state: {[key: string]: any}) => ({
  exp: state.user.profile.points,
  profilePicture: state.user.profile.profilePicture,
  name: state.user.profile.firstName,
});

export default connect(mapStateToProps, { fetchUser })(NavProfileContainer);
