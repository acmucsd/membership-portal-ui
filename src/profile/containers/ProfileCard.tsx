import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ProfileCard from '../components/ProfileCard';
import { getLevel, getRank } from '../../utils';
import { fetchUser } from '../../auth/authActions';

interface NavProfileContainerProps {
  profilePicture: string;
  name: string;
  exp: number;
}

const NavProfileContainer: React.FC<NavProfileContainerProps> = (props) => {
  const { profilePicture, name, exp } = props;

  useEffect(() => {
    fetchUser('');
  }, []);

  return <ProfileCard exp={exp} profilePicture={profilePicture} level={getLevel(exp)} name={name} rank={getRank(exp)} />;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  profilePicture: state.auth.profile.profilePicture,
  exp: state.auth.profile.points,
  name: state.auth.profile.firstName,
});

export default connect(mapStateToProps)(NavProfileContainer);
