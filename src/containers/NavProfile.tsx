import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import NavProfile from '../components/NavProfile';
import { fetchUser } from '../actions/userActions';

interface NavProfileContainerProps {
  exp: number;
  profilePicture: string;
  name: string;
  menu: any;
  fetchUser: Function;
  authenticated: boolean;
}

const NavProfileContainer: React.FC<NavProfileContainerProps> = (props) => {
  const { exp, profilePicture, name, menu, authenticated } = props;

  useEffect(() => {
    props.fetchUser();
  }, []);

  if (authenticated) {
    return <NavProfile exp={exp} profilePicture={profilePicture} name={name} menu={menu} />;
  }
  return <></>;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  exp: state.user.profile.points,
  profilePicture: state.user.profile.profilePicture,
  name: state.user.profile.firstName,
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, { fetchUser })(NavProfileContainer);
