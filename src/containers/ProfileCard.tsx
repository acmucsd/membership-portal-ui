import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ProfileCard from '../components/ProfileCard';
import { getLevel, getRank } from '../utils';
import { fetchUser } from '../actions/userActions';

interface NavProfileContainerProps {
  profilePicture: string;
  name: string;
  exp: number;
  fetchUser: Function;
}

const NavProfileContainer: React.FC<NavProfileContainerProps> = (props) => {
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

const mapStateToProps = (state: { [key: string]: any }) => ({
  profilePicture: state.user.profile.profilePicture,
  exp: state.user.profile.points,
  name: state.user.profile.firstName,
});

export default connect(mapStateToProps, { fetchUser })(NavProfileContainer);
