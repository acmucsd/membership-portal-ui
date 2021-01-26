import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import NavProfile from '../components/NavProfile';
import { fetchUser } from '../../auth/authActions';

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
  exp: state.auth.profile.points,
  profilePicture: state.auth.profile.profilePicture,
  name: state.auth.profile.firstName,
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, { fetchUser })(NavProfileContainer);
