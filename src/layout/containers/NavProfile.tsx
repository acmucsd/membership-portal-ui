import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import NavProfile from '../components/NavProfile';
import { fetchUser as fetchUserConnect } from '../../auth/authActions';

interface NavProfileContainerProps {
  exp: number;
  profilePicture: string;
  name: string;
  menu: any;
  fetchUser: Function;
  authenticated: boolean;
}

const NavProfileContainer: React.FC<NavProfileContainerProps> = (props) => {
  const { exp, profilePicture, name, menu, authenticated, fetchUser } = props;

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (authenticated) {
    return <NavProfile exp={exp} profilePicture={profilePicture} name={name} menu={menu} />;
  }
  return <></>;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  exp: state.auth.profile.points,
  profilePicture: state.auth.profile.profilePicture,
  name: state.auth.profile.firstName,
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, { fetchUser: fetchUserConnect })(NavProfileContainer);
